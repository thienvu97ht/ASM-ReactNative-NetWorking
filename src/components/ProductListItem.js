import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../utils/Number";

export default function ProductListItem(props) {
  const { product, onAddToCartClick } = props;

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: product.images }} />
        <View style={styles.info}>
          <Text style={styles.name}>{product.nameProduct}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)} VNĐ</Text>
            <TouchableOpacity>
              <Text style={styles.cartText}>MUA +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },

    elevation: 5,
  },

  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  info: {
    padding: 8,
    height: 80,
    justifyContent: "space-between",
  },

  img: {
    height: 150,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    resizeMode: "contain",
  },

  name: {
    fontSize: 16,
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 16,
    color: "#888",
  },

  cartText: {
    textTransform: "uppercase",
    fontSize: 16,
    color: "#2f95dc",
  },
});
