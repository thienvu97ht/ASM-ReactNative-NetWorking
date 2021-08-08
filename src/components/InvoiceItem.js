import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../consts/colors";

export default function InvoiceItem() {
  return (
    <View style={styles.container}>
      <View style={styles.paddingBox}>
        <View style={styles.headerBox}>
          <Text style={styles.textTitle}>Đang vận chuyển</Text>
        </View>

        <View style={styles.productBox}>
          <View style={styles.imgBox}></View>
          {/* <Image style={styles.img} source={{ uri: product.images }} /> */}
          <View>
            <Text>Áo ba lỗ xinh đẹp</Text>
          </View>
        </View>

        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },

  paddingBox: {
    paddingHorizontal: 10,
  },

  headerBox: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: COLORS.grey,
  },

  textTitle: {
    color: COLORS.grey,
  },

  productBox: {
    flexDirection: "row",
  },
});
