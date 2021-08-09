import React, { useRef } from "react";
import { Button, Text, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

const SettingsScreen = () => {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
      <Button
        title="Close Bottom Sheet"
        onPress={() => sheetRef.current.snapTo(2)}
      />
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
        enabledContentTapInteraction={false}
      />
    </>
  );
};

export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
