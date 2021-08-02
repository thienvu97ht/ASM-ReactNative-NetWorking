import React from "react";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { formatPrice } from "../../utils/Number";

const DetailsScreen = (props) => {
  const { navigation, route } = props;
  const product = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images }} style={styles.img} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.name_priceContainer}>
          <Text style={styles.nameProduct}>{product.nameProduct}</Text>
          <View style={styles.priceTag}>
            <Text
              style={[
                styles.textPrice,
                {
                  color: COLORS.white,
                },
              ]}>
              {formatPrice(product.price)} VNĐ
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            - Các bạn ăn sinh nhật Degrey có vui không? Cám ơn các bạn đã tham
            gia chương trình Bớt Đay Xoài cùng Degrey
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>-</Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}>
                1
              </Text>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>+</Text>
              </View>
            </View>

            <View style={styles.buyBtn}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: "bold",
                }}>
                Buy
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.5,
    marginTop: 20,
  },

  img: {
    resizeMode: "contain",
    flex: 1,
  },

  detailsContainer: {
    flex: 0.5,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 20,
  },

  name_priceContainer: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameProduct: {
    fontSize: 22,
    fontWeight: "bold",
    width: 250,
  },

  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },

  borderBtnText: {
    fontWeight: "bold",
    fontSize: 28,
  },

  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  priceTag: {
    backgroundColor: COLORS.green,
    width: 120,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },

  textPrice: {
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetailsScreen;
