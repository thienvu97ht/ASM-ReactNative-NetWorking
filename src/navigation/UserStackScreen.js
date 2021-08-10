import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChangePassScreen from "../screens/ChangePassScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import UserScreen from "../screens/UserScreen";

const UserStack = createStackNavigator();

function UserStackScreen() {
  const navigation = useNavigation();

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
      <UserStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Sửa thông tin",
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
      <UserStack.Screen
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
      <UserStack.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{
          title: "Đơn hàng đã mua",
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
      <UserStack.Screen
        name="ChangePass"
        component={ChangePassScreen}
        options={{
          title: "Đổi mật khẩu",
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

export default UserStackScreen;
