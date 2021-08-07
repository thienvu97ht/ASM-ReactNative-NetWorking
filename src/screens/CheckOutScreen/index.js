import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/user";
import { updatePhone } from "../../app/userSlice";
import DialogComponent from "../../components/Dialog";
import COLORS from "../../consts/colors";
import { formatPrice } from "../../utils/Number";

export default function CheckOutScreen(props) {
  const { total } = props.route.params;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const userState = useSelector((state) => state.user);
  const user = userState.user;
  // console.log(total);

  const dispatch = useDispatch();

  const openDialogPhone = () => {
    // Mở dialog
    setVisible(true);
    const newData = {
      title: "Thay đổi điện thoại",
      content: user.phone,
      action: "phone",
    };

    // Set lại data
    setData(newData);
  };

  const onSubmitDialog = (data) => {
    setVisible(false);
    // console.log(data);

    // Xác nhận action => dispatch action len reducer => Gửi data lên sever

    // if (data.action === "phone") {
    //   const action = updatePhone(data.payload);
    //   dispatch(action);
    // }

    switch (data.action) {
      case "phone":
        const action = updatePhone(data.payload);
        dispatch(action);

        // Gửi data lên sever
        const updateUserPhone = async () => {
          await userApi.updateUserPhone({ phone: data.payload });
        };
        updateUserPhone();
        break;
      case "address":
        console.log("address ne");
        break;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <DialogComponent
          visible={visible}
          onSubmitDialog={onSubmitDialog}
          data={data}
        />

        <View style={styles.userInfoSection}>
          <Text style={styles.textProfile}>Người nhận</Text>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: user.avatar,
              }}
              size={70}
            />
            <View style={{ marginLeft: 20, flex: 1 }}>
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
              <View style={styles.phoneBox}>
                <Caption style={styles.caption}>
                  {user.phone === ""
                    ? "Vui lòng nhập thêm số điện thoại"
                    : user.phone}
                </Caption>
                <TouchableOpacity activeOpacity={0.6} onPress={openDialogPhone}>
                  <Text style={styles.textButton}>Thay đổi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userProfile}>
          <Icon
            name="location-pin"
            color={COLORS.icon}
            size={25}
            style={styles.icon}
          />
          <View style={styles.profileBox}>
            <View style={styles.titleBox}>
              <Text style={styles.textProfile}>Địa chỉ giao hàng</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                <Text style={styles.textButton}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textAddressTitle}>Nhà riêng</Text>
              <Text style={styles.textAddress}>
                {user.address === ""
                  ? "Vui lòng nhập địa chỉ giao hàng"
                  : user.address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.userProfile}>
          <Icon
            name="credit-card"
            color={COLORS.icon}
            size={25}
            style={styles.icon}
          />
          <View style={styles.profileBox}>
            <View style={styles.titleBox}>
              <Text style={styles.textProfile}>Phương thức thanh toán</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                <Text style={styles.textButton}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textAddress}>Thanh toán khi nhận hàng</Text>
            </View>
          </View>
        </View>

        <View style={styles.userProfile}>
          <View style={styles.profileBox}>
            <View style={[styles.titleBox, { marginBottom: 10 }]}>
              <Text style={styles.textProfile}>Tổng cộng</Text>
              <Text style={styles.textPrice}>{formatPrice(total)} VNĐ</Text>
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.textProfile}>Phí vận chuyển</Text>
              <Text style={styles.textPrice}>Miễn Phí</Text>
            </View>
          </View>
        </View>

        <View style={styles.btnBox}>
          <TouchableOpacity
            style={styles.btnBuy}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("FinishOrder")}>
            <LinearGradient
              colors={["#edd078", "#edbd2d"]}
              style={styles.btnBuy}>
              <Text
                style={[
                  styles.textBtn,
                  {
                    color: "#444",
                  },
                ]}>
                Hoàn tất
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},

  icon: {
    marginRight: 20,
  },

  textProfile: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.grey,
  },

  userInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  phoneBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  caption: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "500",
    marginTop: 5,
  },

  userProfile: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: "row",
  },

  profileBox: {
    flex: 1,
  },

  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textButton: {
    color: COLORS.icon,
    fontSize: 16,
    fontWeight: "bold",
  },

  textAddressTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 6,
    color: "#444",
  },

  textAddress: {
    fontSize: 16,
    color: COLORS.grey,
  },

  textPrice: {
    fontSize: 18,
    color: "#111",
  },

  btnBox: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  btnBuy: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
