import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Bee from "../../assets/bee.gif";
import COLORS from "../../consts/colors";

export default function finishOrderScreen(props) {
  const navigation = useNavigation();

  // Kiểm tra sản phẩm trong giỏ hàng
  // Nếu không có sản phẩm => CartScreen

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.center}
        showsVerticalScrollIndicator={false}>
        <Image style={styles.img} source={Bee} />
        <Text style={styles.textSuccess}>Thanh toán thành công</Text>
        <Text style={styles.textContent}>
          Cảm ơn bạn đã đặt hàng tại ShopBee
        </Text>
        <Text style={styles.textContent}>
          Bạn sẽ nhận được email trong thời gian ngắn!
        </Text>

        <TouchableOpacity
          style={styles.btnBuy}
          activeOpacity={0.6}
          onPress={goHome}>
          <LinearGradient colors={["#edd078", "#edbd2d"]} style={styles.btnBuy}>
            <Text
              style={[
                styles.textBtn,
                {
                  color: "#444",
                },
              ]}>
              Trở về trang chủ
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    height: 200,
    width: 200,
  },

  textSuccess: {
    fontSize: 24,
    fontWeight: "bold",
  },

  textContent: {
    fontSize: 16,
    lineHeight: 26,
    marginVertical: 6,
  },

  btnBuy: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
