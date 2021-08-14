import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import COLORS from "../../consts/colors";

export default function SupportScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://192.168.0.2:4000", { json: false });
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const sendMessage = () => {
    socketRef.current.emit("message", { name: user.username, message });
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatLog}>
        {chat.map(({ name, message }, index) => (
          <View key={index} style={styles.chatLine}>
            <Text
              style={[
                styles.textName,
                { color: name == user.username ? "blue" : "red" },
              ]}>
              {name}:
            </Text>
            <Text style={styles.textMessage}>{message}</Text>
          </View>
        ))}

        {/* {renderChat()} */}
      </View>

      <View style={styles.sendMessage}>
        <TextInput
          style={styles.inputMessage}
          value={message}
          autoCapitalize="none"
          onChangeText={(val) => setMessage(val)}
        />

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={sendMessage}>
            <LinearGradient
              colors={["#edd078", "#edbd2d"]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#444",
                  },
                ]}>
                Gửi
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },

  chatLog: {
    flex: 90,
  },

  sendMessage: {
    flex: 10,
    flexDirection: "row",
  },

  inputMessage: {
    borderWidth: 1,
    height: 50,
    width: "70%",
    borderRadius: 10,
    borderColor: COLORS.grey,
    paddingHorizontal: 10,
  },

  button: {
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
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

  chatLine: {
    flexDirection: "row",
    paddingVertical: 3,
  },

  textName: {
    fontSize: 16,
  },

  textMessage: {
    fontSize: 16,
    marginLeft: 5,
  },
});
