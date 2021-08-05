import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import COLORS from "../../consts/colors";

export default function CheckOutScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text>Người nhận</Text>
        </View>

        <View></View>

        <View></View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
