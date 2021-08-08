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
import authenApi from "../../api/authen";

const NewPasswordScreen = ({ navigation }) => {
  const [data, setData] = useState({
    otp: "",
    password: "",
    confirm_password: "",
    check_otpInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textOtpInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        otp: val,
        check_otpInputChange: true,
      });
    } else {
      setData({
        ...data,
        otp: val,
        check_otpInputChange: false,
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

  const handleLoginFormSubmit = () => {
    const { otp, password, confirm_password } = data;
    if (password === confirm_password && password.trim().length !== 0) {
      const formData = {
        otp,
        password,
      };

      const newPasswordApp = async () => {
        const res = await authenApi.newPassword(formData);
        console.log(res);
        if (res.status !== 1) {
          alert(res.message);
        } else {
          // history.push("/login");
          navigation.navigate("SignIn");
        }
      };

      newPasswordApp();
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập lại mật khẩu!", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f1d276" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Đổi mật khẩu mới</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Mã xác thực</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nhập mã xác thực"
            keyboardType="number-pad"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textOtpInputChange(val)}
          />
          {data.check_otpInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text style={[styles.text_footer, { marginTop: 25 }]}>Mật khẩu</Text>
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
        </View>
      </Animatable.View>
    </View>
  );
};

export default NewPasswordScreen;

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
