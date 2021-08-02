import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import favoriteApi from "../../api/favorites";
import ProductItem from "../../components/ProductItem";
import COLORS from "../../consts/colors";

export default function FavoritesScreen(props) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const favoriteList = await favoriteApi.getAllFavorites();
    setIsLoading(false);
    setFavorites(favoriteList);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshing={isLoading}
        onRefresh={fetchData}
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <ProductItem product={item} />}
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
