import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CartScreen from "../CartSceen";
import DetailsScreen from "../DetailsScreen";
import HomeScreen from "../HomeScreen";
import SettingsScreen from "../SettingsScreen";
import UserScreen from "../UserScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native-animatable";
import FavoritesScreen from "../FavoritesScreen";
import { Button } from "react-native";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const UserStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function MainScreen() {
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
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarBadge: 3,
          title: "Giỏ hàng",
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          title: "Người dùng",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          title: "Cài đặt",
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang Chủ",
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
      <HomeStack.Screen
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
    </HomeStack.Navigator>
  );
}

export function CartStackScreen() {
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
    </CartStack.Navigator>
  );
}

export function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: "Người dùng",
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

          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor="#f1d276"
                color="#000"
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Sản phẩm yêu thích",
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
    </UserStack.Navigator>
  );
}

export function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Cài đặt",
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
    </SettingsStack.Navigator>
  );
}
