import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ForgotPwdScreen from "./src/screens/ForgotPwdScreen";
import NewPasswordScreen from "./src/screens/NewPasswordScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} />
        <Stack.Screen name="NewPwd" component={NewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
