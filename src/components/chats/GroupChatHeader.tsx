import React from "react";
import { StyleSheet, View } from "react-native";
import { Subheading } from "react-native-paper";
import GotoGroupChatButton from "./GotoGroupChatButton";

interface GroupChatHeaderProps {
  desc?: string;
}

const GroupChatHeader: React.FC<GroupChatHeaderProps> = ({
  desc = "Group where you can talk about you favourite instruments",
}) => {
  return (
    <View style={styles.header}>
      <GotoGroupChatButton />
      <Subheading style={styles.text}>{desc}</Subheading>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderRightWidth: 0.01,
    borderBottomRightRadius: 20,
  },
  text: {
    fontStyle: "italic",
    textAlign: "right",
    color: "blue",
    marginLeft: 5,
    width: "82%",
  },
});

export default GroupChatHeader;
