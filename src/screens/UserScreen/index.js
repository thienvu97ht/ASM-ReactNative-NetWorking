import AsyncStorage from "@react-native-async-storage/async-storage";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
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

export default function UserScreen(props) {
  const { navigation } = props;
  // const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const action = fetchUserData();
    const resultAction = await dispatch(action);
    // const user = unwrapResult(resultAction);
    setIsLoading(false);
    // setUser(user);
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
                uri: user.avatar,
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
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                name="text-box-multiple-outline"
                color={COLORS.icon}
                size={25}
              />
              <Text style={styles.menuItemText}>Đơn hàng</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <SimpleLineIcons
                name="location-pin"
                color={COLORS.icon}
                size={25}
              />
              <Text style={styles.menuItemText}>Địa chỉ</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
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
