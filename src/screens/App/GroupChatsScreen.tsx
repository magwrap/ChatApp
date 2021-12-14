import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface GroupChatScreenProps {
  navigation: any;
}

const GroupChatScreen: React.FC<GroupChatScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <Title>Chats</Title>
      <Divider />
    </Center>
  );
};

export default GroupChatScreen;
