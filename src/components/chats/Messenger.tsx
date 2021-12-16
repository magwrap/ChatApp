import { collectionNames } from "@/hooks/useFirebase";
import useRedux from "@/hooks/useRedux";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import ChatMessage from "./ChatMessage";

interface MessengerProps {
  messages: Data<DocumentData, "", "">[] | undefined;
  addMessage:
    | ((text: string, uid: string, photoURL: string) => Promise<void>)
    | ((
        text: string,
        uid: string,
        photoURL: string,
        collectionName?:
          | collectionNames.BRASS
          | collectionNames.PERCUSSION
          | collectionNames.STRING
      ) => Promise<void>);
  collectionName?:
    | collectionNames.BRASS
    | collectionNames.PERCUSSION
    | collectionNames.STRING
    | null;
}

const Messenger: React.FC<MessengerProps> = ({
  messages,
  addMessage,
  collectionName = null,
}) => {
  const [messageValue, setMessageValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useRedux();
  const userData = user?.userData;

  const sendMessage = async () => {
    if (userData?.id && userData?.photoUrl && messageValue) {
      setLoading(true);
      if (collectionName) {
        await addMessage(
          messageValue,
          userData?.id,
          userData?.photoUrl,
          collectionName
        );
      } else {
        await addMessage(messageValue, userData?.id, userData?.photoUrl);
      }
      setMessageValue("");
      setLoading(false);
    }
  };

  const renderItem = (message: Data<DocumentData, "", "">) => {
    return <ChatMessage message={message.item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      {messages && (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(message) => message.id}
          inverted={true}
        />
      )}
      <View
        style={{
          width: "100%",
        }}>
        <TextInput
          label="Send a message"
          value={messageValue}
          onChangeText={setMessageValue}
          disabled={loading}
          right={<TextInput.Icon name="send" onPress={sendMessage} />}
        />
      </View>
    </View>
  );
};

export default Messenger;
