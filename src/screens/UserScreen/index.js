import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Avatar,
  Caption,
  Text,
  Title,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../app/userSlice";
import COLORS from "../../consts/colors";

export default function UserScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const avatarDefaul =
    "https://i.ibb.co/BCX3q9q/57393124-364351517508038-8412224844044697600-n.png";

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  const fetchData = async () => {
    setIsLoading(true);
    const action = fetchUserData();
    dispatch(action);
    setIsLoading(false);
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      navigation.navigate("SignIn");
      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: user.avatar ? user.avatar : avatarDefaul,
              }}
              size={70}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 8,
                    marginBottom: 5,
                  },
                ]}>
                {user.fullname}
              </Title>
              <Caption style={styles.caption}>@{user.username}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.address === "" ? "Chưa có địa chỉ" : user.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.phone === "" ? "Chưa có SĐT" : user.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.email === "" ? "Chưa có email" : user.email}
            </Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate("Favorites")}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color={COLORS.icon} size={25} />
              <Text style={styles.menuItemText}>Sản phẩm yêu thích</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => navigation.navigate("Invoice")}>
            <View style={styles.menuItem}>
              <Icon
                name="text-box-multiple-outline"
                color={COLORS.icon}
                size={25}
              />
              <Text style={styles.menuItemText}>Đơn hàng</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => navigation.navigate("ChangePass")}>
            <View style={styles.menuItem}>
              <Icon name="key-change" color={COLORS.icon} size={25} />
              <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => navigation.navigate("Support")}>
            <View style={styles.menuItem}>
              <Icon
                name="account-check-outline"
                color={COLORS.icon}
                size={25}
              />
              <Text style={styles.menuItemText}>Hỗ trợ</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={handleLogOut}>
            <View style={styles.menuItem}>
              <Icon name="logout" color={COLORS.icon} size={25} />
              <Text style={styles.menuItemText}>Đăng xuất</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  caption: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },

  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
