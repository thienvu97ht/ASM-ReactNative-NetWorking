import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../api/carts";
import { deleteProductInCart, fetchProducts } from "../../app/cartSilce";
import EmpryCart from "../../assets/empty_cart.png";
import CartItem from "../../components/cartItem";
import COLORS from "../../consts/colors";

export default function CartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.carts);
  const products = cartState.productInCart;

  useEffect(() => {
    fetchData();
  }, []);

  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  const fetchData = async () => {
    setIsLoading(true);
    const action = fetchProducts();
    await dispatch(action);
    setIsLoading(false);
  };

  const handleDeleteProduct = (id) => {
    const action = deleteProductInCart(id);
    dispatch(action);

    const deleteProduct = async () => {
      const resp = await cartApi.deleteProductInCart({ id });
    };
    deleteProduct();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}>
      {products.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.center}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }>
          <Image style={styles.img} source={EmpryCart} />
          <Text style={styles.textEmpty}>Giỏ hàng trống</Text>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }>
          <CartItem
            products={products}
            deleteProduct={handleDeleteProduct}
            subTotal={totalPrice}
            discount={discount}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 30,
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

  textEmpty: {
    fontSize: 18,
    marginTop: 20,
  },
});
