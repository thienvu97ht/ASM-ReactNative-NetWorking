import React from "react";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../../consts/colors";

export default function SettingsScreen() {
  const [isLike, setIsLike] = useState(false);

  const toggleLike = () => {
    setIsLike((x) => !x);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={toggleLike}
        style={[
          styles.likeButton,
          {
            backgroundColor: isLike
              ? "rgba(245, 42, 42,0.2)"
              : "rgba(0,0,0,0.2) ",
          },
        ]}>
        <Icon name="heart" size={18} color={isLike ? "#F52A2A" : "#000"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  likeButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
