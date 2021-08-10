import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/app/store";
import ForgotPwdScreen from "./src/screens/ForgotPwdScreen";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
          {/* BottomTab */}
          <Stack.Screen name="Main" component={MainScreen} />

          {/* MainScreen */}

          {/* Auth */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} />
          <Stack.Screen name="NewPwd" component={NewPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
