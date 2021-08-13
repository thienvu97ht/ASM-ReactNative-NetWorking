import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/app/store";
import ForgotPwdScreen from "./src/screens/ForgotPwdScreen";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SupportScreen from "./src/screens/SupportScreen";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

export default function App() {
  useEffect(() => {
    getNotificationToken();
  }, []);

  async function getNotificationToken() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("failed to get notification token");
        return;
      }
    }
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log({ token });
    return token;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPwd" component={ForgotPwdScreen} />
          <Stack.Screen name="NewPwd" component={NewPasswordScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
