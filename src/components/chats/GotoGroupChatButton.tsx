import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

interface GotoGroupChatButtonProps {}

const GotoGroupChatButton: React.FC<GotoGroupChatButtonProps> = ({}) => {
  const navigation = useNavigation();
  const goToChatGroupScreen = () => {
    navigation.navigate("GroupChat");
  };
  return <IconButton icon="arrow-left" onPress={goToChatGroupScreen} />;
};
export default GotoGroupChatButton;
