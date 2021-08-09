import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../consts/colors";
import { formatPrice } from "../utils/Number";

export default function InvoiceItem(props) {
  const { product } = props;

  let totalPrice = 0;
  let totalQuantity = 0;
  product.forEach((product) => {
    totalPrice += Number(product.price) * Number(product.quantity);
    totalQuantity += Number(product.quantity);
  });

  return (
    <View style={styles.container}>
      <View style={styles.paddingBox}>
        <View style={styles.headerBox}>
          <Text style={styles.textTitle}>Đang vận chuyển</Text>
          <Text style={styles.textTitle}>Mã HĐ: {product[0].id_bill}</Text>
        </View>

        <View style={styles.productBox}>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={{ uri: product[0].images }} />
          </View>

          <View style={styles.productContent}>
            <Text style={styles.textname}>{product[0].name}</Text>
            <View style={styles.quantity}>
              <Text style={styles.textPrice}>{totalQuantity} sản phẩm</Text>
              <Text style={styles.textLine}>|</Text>
              <Text style={styles.textPrice}>
                {formatPrice(totalPrice)} VNĐ
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button}>
            <Text>Xem chi tiết</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>Mua lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    borderRadius: 10,
    marginBottom: 20,
  },

  paddingBox: {
    padding: 10,
  },

  headerBox: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.grey,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textTitle: {
    color: COLORS.grey,
  },

  productBox: {
    flexDirection: "row",
    marginTop: 10,
  },

  imgBox: {
    height: 100,
    width: 100,
  },

  img: {
    flex: 1,
    resizeMode: "contain",
  },

  productContent: {
    justifyContent: "center",
  },

  textname: {
    fontSize: 14,
  },

  quantity: {
    flexDirection: "row",
    marginTop: 5,
  },

  textPrice: {
    color: COLORS.grey,
  },

  textLine: {
    fontSize: 14,
    color: COLORS.grey,
    paddingHorizontal: 5,
  },

  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fcc726",
  },
});
