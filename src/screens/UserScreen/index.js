import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "../../api/user";

export default function UserScreen(props) {
  const { navigation } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    const getToken = async () => {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (access_token) {
          const fetchData = async () => {
            const resp = await userApi.getUser();
            if (resp.message === "Logged") {
              console.log(resp.user);
              setUser(resp.user);
            }
          };
          fetchData();
        }
      } catch (e) {
        // error reading value
      }
    };
    getToken();
  }, []);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      navigation.navigate("SignIn");
      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: user.avatar }} />
      <Text>Họ tên: {user.name}</Text>
      <Text>Tên tài khoản: {user.username}</Text>

      <TouchableOpacity onPress={handleLogOut}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 80,
    height: 80,
  },
});
