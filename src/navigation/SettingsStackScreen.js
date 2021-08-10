import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingsScreen from "../screens/SettingsScreen";

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
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

export default SettingsStackScreen;
