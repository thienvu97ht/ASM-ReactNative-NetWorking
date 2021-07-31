import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "../../api/user";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const getToken = async () => {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (access_token !== null) {
          const fetchData = async () => {
            const resp = await userApi.getUser();
            if (resp.message) {
              navigation.navigate("Main");
            }
          };
          fetchData();
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#444" }}>
          ShopBee
        </Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Gì cũng có, mua hết ở ShopBee!</Text>
        <Text style={styles.text}>Đăng nhập với tài khoản</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <LinearGradient
              style={styles.signIn}
              colors={["#edd078", "#edbd2d"]}>
              <Text style={styles.textSign}>Bắt đầu</Text>
              <MaterialIcons name="navigate-next" color="#444" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1d276",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "#444",
    fontWeight: "bold",
  },
});
