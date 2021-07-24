import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    const getToken = async () => {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        if (access_token) {
          console.log(access_token);
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
      <Text>UserScreen</Text>

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
});
