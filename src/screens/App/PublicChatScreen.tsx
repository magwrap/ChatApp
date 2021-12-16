import Messenger from "@/components/chats/Messenger";
import { usePublicMessagesCollection } from "@/hooks/useFirebase";
import * as React from "react";
import { ActivityIndicator } from "react-native-paper";

interface PublicChatScreenProps {
  navigation: any;
}

const PublicChatScreen: React.FC<PublicChatScreenProps> = ({ navigation }) => {
  const { messages, addMessage } = usePublicMessagesCollection();
  // console.log(messages);
  return messages ? (
    <Messenger messages={messages} addMessage={addMessage} />
  ) : (
    <ActivityIndicator />
  );
};

export default PublicChatScreen;
