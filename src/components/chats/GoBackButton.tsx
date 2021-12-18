import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

interface GoBackButtonProps {}

const GoBackButton: React.FC<GoBackButtonProps> = ({}) => {
  const navigation = useNavigation();
  const goToChatGroupScreen = () => {
    navigation.goBack();
  };
  return <IconButton icon="arrow-left" onPress={goToChatGroupScreen} />;
};
export default GoBackButton;
