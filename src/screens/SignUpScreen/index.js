import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import authenApi from "../../api/authen";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    check_UsernameInputChange: false,
    check_FullnameInputChange: false,
    check_EmailInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textUsernameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_UsernameInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_UsernameInputChange: false,
      });
    }
  };

  const textFullnameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        fullname: val,
        check_FullnameInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullname: val,
        check_FullnameInputChange: false,
      });
    }
  };

  const textEmailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_EmailInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_EmailInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleSigUp = () => {
    const { username, fullname, email, password, confirm_password } = data;

    if (password === confirm_password && password.trim().length > 0) {
      formSignUp = {
        username,
        fullname,
        email,
        password,
      };

      const registerApp = async () => {
        const res = await authenApi.register(formSignUp);
        if (res.status === 1) {
          navigation.navigate("SignIn");
        } else {
          console.log(res);
        }
      };

      registerApp();
    } else {
      Alert.alert("Thông báo", "Mật khẩu không trùng khớp!", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f1d276" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Đăng ký!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Tài khoản</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập tài khoản"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textUsernameInputChange(val)}
          />
          {data.check_UsernameInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
          Họ tên
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập họ và tên"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textFullnameInputChange(val)}
          />
          {data.check_FullnameInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <MaterialIcons name="mail-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập email"
            keyboardType="email-address"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textEmailInputChange(val)}
          />
          {data.check_EmailInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
          Mật khẩu
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập mật khẩu"
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

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
          Xác nhận mật khẩu
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Xác nhận lại mật khẩu"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleSigUp}>
            <LinearGradient
              colors={["#edd078", "#edbd2d"]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#000",
                  },
                ]}>
                Đăng ký
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
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#faba00",
                },
              ]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1d276",
  },
  header: {
    flex: 10,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 90,
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
});
