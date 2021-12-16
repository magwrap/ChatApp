import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption } from "react-native-paper";

interface ChatHeaderTextProps {}

const ChatHeaderText: React.FC<ChatHeaderTextProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Caption style={styles.text}>Let's talk instruments!</Caption>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  text: {
    fontStyle: "italic",
    fontSize: 15,
  },
});

export default ChatHeaderText;
