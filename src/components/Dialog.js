import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export default function DialogComponent(props) {
  const { onSubmitDialog, visible, data } = props;
  const [inputValue, setInputValue] = useState(data.content);

  useEffect(() => {
    setInputValue(data.content);
  }, [data.content]);

  const onSubmit = () => {
    const formData = {
      payload: inputValue,
      action: data.action,
    };
    onSubmitDialog(formData);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{data.title}</Dialog.Title>
        <Dialog.Input
          value={inputValue}
          keyboardType={data.action === "phone" ? "number-pad" : "default"}
          onChangeText={(val) => setInputValue(val)}
        />
        <Dialog.Button label="Xác nhận" onPress={onSubmit} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
