import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import cartApi from "../../api/carts";
import EmpryCart from "../../assets/empty_cart.png";
import CartItem from "../../components/cartItem";
import COLORS from "../../consts/colors";

export default function CartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await cartApi.getAllProductsInCart();
    setProducts(data);
    setIsLoading(false);
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
          <CartItem products={products} />
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
