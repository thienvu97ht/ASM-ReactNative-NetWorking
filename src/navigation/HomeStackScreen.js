import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
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

export default HomeStackScreen;
