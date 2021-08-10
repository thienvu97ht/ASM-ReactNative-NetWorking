import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import HomeStackScreen from "../../navigation/HomeStackScreen";
import CartStackScreen from "../../navigation/CartStackScreen";
import UserStackScreen from "../../navigation/UserStackScreen";
import SettingsStackScreen from "../../navigation/SettingsStackScreen";

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [total, setTotal] = useState();
  const cartState = useSelector((state) => state.carts);

  useEffect(() => {
    const productInCart = cartState.productInCart;

    let totalQuantity = 0;
    productInCart.forEach((product) => {
      totalQuantity += Number(product.quantity);
    });
    setTotal(totalQuantity);
  }, [cartState]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "User") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "md-settings" : "md-settings-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#f0b507",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: "Trang Chủ",
          tabBarLabel: "Home",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarBadge: total,
          title: "Giỏ hàng",
          tabBarLabel: "Cart",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          title: "Người dùng",
          tabBarLabel: "User",
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          title: "Cài đặt",
          tabBarLabel: "Settings",
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
