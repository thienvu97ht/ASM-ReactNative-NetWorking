import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-animatable";
import Animated from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { updateProfile } from "../../app/userSlice";
import COLORS from "../../consts/colors";

const EditProfileScreen = () => {
  const userState = useSelector((state) => state.user);
  const user = userState.user;

  const dispatch = useDispatch();

  const avatarDefaul =
    "https://i.ibb.co/BCX3q9q/57393124-364351517508038-8412224844044697600-n.png";

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [inputUser, setInputUser] = useState({
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar,
    email: user.email,
  });

  const updateProfileUser = async () => {
    const action = updateProfile(inputUser);
    await dispatch(action);

    Alert.alert("Thông báo", "Đổi thông tin thành công!", [{ text: "Okay" }]);
  };

  const takePhotoFromCamera = () => {};

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const newProfile = {
        ...inputUser,
        avatar: result.uri,
      };
      setInputUser(newProfile);
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Thay đổi ảnh đại diện</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Lấy ảnh từ thư viện</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Hủy bỏ</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => bs.current.snapTo(1)}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={false}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <ImageBackground
                source={{
                  uri: inputUser.avatar ? inputUser.avatar : avatarDefaul,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>

            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {user.fullname}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="Họ tên"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: COLORS.grey,
              },
            ]}
            value={inputUser.fullname}
            onChangeText={(val) =>
              setInputUser({ ...inputUser, fullname: val })
            }
          />
        </View>

        <View style={styles.action}>
          <Feather name="phone" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="SĐT"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: COLORS.grey,
              },
            ]}
            value={inputUser.phone}
            onChangeText={(val) => setInputUser({ ...inputUser, phone: val })}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: COLORS.grey,
              },
            ]}
            value={inputUser.email}
            onChangeText={(val) => setInputUser({ ...inputUser, email: val })}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="globe" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="Địa chỉ"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: COLORS.grey,
              },
            ]}
            value={inputUser.address}
            onChangeText={(val) => setInputUser({ ...inputUser, address: val })}
          />
        </View>

        <TouchableOpacity style={styles.signIn} onPress={updateProfileUser}>
          <LinearGradient colors={["#edd078", "#edbd2d"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#444",
                },
              ]}>
              Xác nhận
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  panelHeader: {
    alignItems: "center",
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
  },

  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
