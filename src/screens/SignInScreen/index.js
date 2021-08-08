import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authenApi from "../../api/authen";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLoginFormSubmit = () => {
    const loginForm = {
      username: data.username,
      password: data.password,
    };
    if (loginForm.username !== "" && loginForm.password !== "") {
      const loginApp = async () => {
        const res = await authenApi.checkLogin(loginForm);

        if (res.message) {
          alert(res.message);
        }
        const access_token = res.access_token;
        if (access_token) {
          await AsyncStorage.setItem("access_token", access_token);
          // chuyển trang
          navigation.navigate("Home");
        } else {
          // alert("Tài khoản hoặc mật khẩu không chính xác");
        }
      };

      loginApp();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f1d276" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Chào mừng đến với ShopBee!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Tài khoản</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập tài khoản của bạn"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Mật khẩu</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập mật khẩu của bạn"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPwdBtn}
          onPress={() => navigation.navigate("ForgotPwd")}>
          <Text style={styles.forgotPwdText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleLoginFormSubmit}>
            <LinearGradient
              colors={["#edd078", "#edbd2d"]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#444",
                  },
                ]}>
                Đăng nhập
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#edbd2d",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#faba00",
                },
              ]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1d276",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  forgotPwdBtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  forgotPwdText: {
    fontSize: 18,
  },
});
