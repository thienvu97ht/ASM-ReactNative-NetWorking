import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../api/carts";
import { addProductInCart, updateProductInCart } from "../../app/cartSilce";
import COLORS from "../../consts/colors";
import { formatPrice } from "../../utils/Number";

const DetailsScreen = (props) => {
  const { route } = props;
  const product = route.params;

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.carts);
  const productInCart = cartState.productInCart;

  // Tăng số lượng
  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  // Giảm số lượng
  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const addProduct = async (data) => {
    await cartApi.addProductToCart(data);
  };

  const updateProduct = async (data) => {
    await cartApi.updateProductInCart(data);
  };

  // Thêm vào giỏ hàng
  const buyProduct = () => {
    const payload = {
      id: product.id,
      images: product.images,
      nameProduct: product.nameProduct,
      price: product.price,
      quantity: quantity,
    };

    let index = productInCart.findIndex((x) => x.id === payload.id);

    if (index === -1) {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng
      window.alert("Thêm sản phẩm vào giỏ hàng thành công!");
      const action = addProductInCart(payload);
      dispatch(action);

      const data = {
        id: product.id,
        quantity: quantity,
      };
      addProduct(data);
    } else {
      window.alert("Thêm sản phẩm vào giỏ hàng thành công!");
      const action = updateProductInCart(payload);
      dispatch(action);

      const data = {
        id: product.id,
        quantity: Number(productInCart[index].quantity) + Number(quantity),
      };

      updateProduct(data);
    }
  };

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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Mô tả sản phẩm
          </Text>
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={decrease}
                style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}>
                {quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={increase}
                style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={buyProduct}
              style={styles.buyBtn}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: "bold",
                }}>
                Mua ngay
              </Text>
            </TouchableOpacity>
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
