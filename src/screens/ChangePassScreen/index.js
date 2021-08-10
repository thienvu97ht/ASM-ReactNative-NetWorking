import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import authenApi from "../../api/authen";
import COLORS from "../../consts/colors";

export default function ChangePassScreen() {
  const [data, setData] = useState({
    password: "",
    confirm_password: "",
    secureTextEntry: true,
  });

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

  const handleResetPass = async () => {
    const { password, confirm_password } = data;

    if ((password === confirm_password) & (password.trim().length > 0)) {
      // Thay đổi mật khẩu
      const resp = await authenApi.changePassword({ password });
      console.log(resp);
    } else {
      Alert.alert("Thông báo", "Mật khẩu không trùng khớp!", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.textHeader}>Đặt lại mật khẩu</Text>
          <Text style={styles.textTitle}>
            Mật khẩu mới của bạn phải khác mật khẩu trước đó
          </Text>
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
            secureTextEntry={true}
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
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleResetPass}>
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
                Đặt lại mật khẩu
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },

  textHeader: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  textTitle: {
    fontSize: 16,
  },

  text_footer: {
    color: "#05375a",
    fontSize: 16,
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    borderBottomWidth: 1,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    lineHeight: 16,
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
