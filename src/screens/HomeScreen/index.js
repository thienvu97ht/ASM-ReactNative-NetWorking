import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, SafeAreaView } from "react-native";
import axios from "axios";
import ProductListItem from "../../components/ProductListItem";
import productApi from "../../api/products";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productList = await productApi.getAllProducts();
      setProducts(productList);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        contentContainerStyle={styles.container}
        numColumns={2}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <ProductListItem product={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
