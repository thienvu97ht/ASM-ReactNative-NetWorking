import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import favoriteApi from "../api/favorites";
import COLORS from "../consts/colors";
import { formatPrice } from "../utils/Number";
const width = Dimensions.get("window").width / 2 - 30;

export default function ProductItem(props) {
  const { product, setIsLike } = props;
  const navigation = useNavigation();

  const toggleLike = () => {
    if (product.is_like) {
      // Unlike
      const unlikeProduct = async () => {
        const resp = await favoriteApi.deleteFavorite({ id: product.id });
      };
      unlikeProduct();
    } else {
      // Like
      const likeProduct = async () => {
        const resp = await favoriteApi.addFavorite({ id: product.id });
      };
      likeProduct();
    }

    setIsLike(product.id);
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.likeBox}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={toggleLike}
            style={[
              styles.likeButton,
              {
                backgroundColor: product.is_like
                  ? "rgba(245, 42, 42,0.2)"
                  : "rgba(0,0,0,0.2) ",
              },
            ]}>
            <Icon
              name="favorite"
              size={18}
              color={!product.is_like ? "#000" : "#F52A2A"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.imgBox}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Details", product)}>
          <Image style={styles.img} source={{ uri: product.images }} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Details", product)}>
          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {product.nameProduct}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}>
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            {formatPrice(product.price)} VN??
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Details", product)}
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{ fontSize: 22, color: COLORS.white, fontWeight: "bold" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 264,
    backgroundColor: COLORS.white,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },

  likeBox: {
    alignItems: "flex-end",
  },

  likeButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  imgBox: {
    height: 120,
  },

  img: {
    flex: 1,
    resizeMode: "contain",
  },
});
