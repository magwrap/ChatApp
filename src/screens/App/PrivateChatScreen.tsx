import Center from "@/components/Center";
import * as React from "react";
import { Divider, Title } from "react-native-paper";

interface PrivateChatScreenProps {
  navigation: any;
}

const PrivateChatScreen: React.FC<PrivateChatScreenProps> = ({
  navigation,
}) => {
  return (
    <Center>
      <Title>Chats Private</Title>
      <Divider />
    </Center>
  );
};

export default PrivateChatScreen;
