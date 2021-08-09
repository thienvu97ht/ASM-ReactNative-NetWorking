import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import productApi from "../../api/products";
import { fetchProductsInCart } from "../../app/cartSilce";
import { fetchUserData } from "../../app/userSlice";
import ProductItem from "../../components/ProductItem";
import COLORS from "../../consts/colors";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const productList = await productApi.getAllProductsByUsername();
    setIsLoading(false);
    setProducts(productList);

    // Tải user data
    const actionUser = fetchUserData();
    await dispatch(actionUser);

    // Tải product in cart
    const actionProductInCart = fetchProductsInCart();
    await dispatch(actionProductInCart);
  };

  const setIsLike = (id) => {
    const index = products.findIndex((x) => x.id === id);

    const newProductList = [...products];
    const newProduct = {
      ...newProductList[index],
      is_like: newProductList[index].is_like ? null : 1,
    };

    newProductList[index] = newProduct;

    // update product list
    setProducts(newProductList);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.light }}>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshing={isLoading}
        onRefresh={fetchData}
        data={products}
        numColumns={2}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <ProductItem product={item} setIsLike={setIsLike} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
