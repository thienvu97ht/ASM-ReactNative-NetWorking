import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import COLORS from "../consts/colors";
import { formatPrice } from "../utils/Number";

export default function CartItem(props) {
  const { products, deleteProduct } = props;
  const navigation = useNavigation();

  const handleDiscount = () => {};

  const getIdProduct = (id) => {
    deleteProduct(id);
  };

  const cartState = useSelector((state) => state.carts);

  const checkOut = () => {
    console.log(cartState.productInCart);
  };

  return (
    <View>
      {products.map((product, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.imgBox}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Details", product)}>
              <Image style={styles.img} source={{ uri: product.images }} />
            </TouchableOpacity>

            <View style={styles.name_priceBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Details", product)}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                  {product.nameProduct}
                </Text>
              </TouchableOpacity>

              <Text style={styles.textPrice}>
                {formatPrice(product.price)} VNĐ
              </Text>
            </View>

            {/* Quantity */}
            <View style={styles.quantityBox}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.quantityButton}>
                <Icon name="minus" size={18} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                }}>
                {product.quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.quantityButton}>
                <Icon name="plus" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.deleteProduct}
              activeOpacity={0.6}
              onPress={() => getIdProduct(product.id)}>
              <View style={styles.deleteButton}>
                <Icon name="trash-2" size={22} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.discountContainer}>
        <TextInput
          placeholder="Nhập mã giảm giá của bạn"
          style={styles.discountInput}
          autoCapitalize="none"
          onChangeText={(val) => handleDiscount(val)}
        />

        <TouchableOpacity
          style={([styles.btnBuy], { width: 120 })}
          activeOpacity={0.6}>
          <LinearGradient colors={["#edd078", "#edbd2d"]} style={styles.btnBuy}>
            <Text
              style={[
                styles.textBtn,
                {
                  color: "#444",
                },
              ]}>
              Kiểm tra
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnBuy}
        activeOpacity={0.6}
        onPress={checkOut}>
        <LinearGradient colors={["#edd078", "#edbd2d"]} style={styles.btnBuy}>
          <Text
            style={[
              styles.textBtn,
              {
                color: "#444",
              },
            ]}>
            Thanh toán
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
  },

  card: {
    padding: 10,
    flexDirection: "row",
  },

  imgBox: {
    height: 100,
    width: 100,
  },

  img: {
    flex: 1,
    resizeMode: "contain",
  },

  name_priceBox: {
    flex: 70,
  },

  textPrice: {
    fontSize: 16,
    marginTop: 10,
  },

  //   quantity
  quantityBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 20,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2) ",
  },

  //   delete
  deleteProduct: {
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
    backgroundColor: "rgba(245, 42, 42,0.2)",
    borderRadius: 8,
  },

  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  discountContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  discountInput: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 20,
    fontSize: 16,
    borderColor: "grey",
  },

  //   Button
  btnBuy: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // marginBottom: 20,
  },

  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
