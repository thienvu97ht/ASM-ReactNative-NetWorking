import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CartScreen from "../screens/CartSceen";
import CheckOutScreen from "../screens/CheckOutScreen";
import DetailsScreen from "../screens/DetailsScreen";
import finishOrderScreen from "../screens/FinishOrderScreen";

const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Giỏ Hàng",
          headerStyle: {
            backgroundColor: "#f1d276",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => {
            return null;
          },
        }}
      />
      <CartStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Chi tiết",
          headerStyle: {
            backgroundColor: "#f1d276",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <CartStack.Screen
        name="CheckOut"
        component={CheckOutScreen}
        options={{
          title: "Thanh toán",
          headerStyle: {
            backgroundColor: "#f1d276",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <CartStack.Screen
        name="FinishOrder"
        component={finishOrderScreen}
        options={{
          title: "Hoàn tất",
          headerStyle: {
            backgroundColor: "#f1d276",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </CartStack.Navigator>
  );
}

export default CartStackScreen;
