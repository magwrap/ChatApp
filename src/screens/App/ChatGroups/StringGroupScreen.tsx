import Messenger from "@/components/chats/Messenger";
import {
  collectionNames,
  useGroupMessagesCollections,
} from "@/hooks/useFirebase";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface StringGroupScreenProps {
  navigation: any;
}

const StringGroupScreen: React.FC<StringGroupScreenProps> = ({
  navigation,
}) => {
  const { stringMessages, addMessage } = useGroupMessagesCollections();

  return (
    <View style={{ flex: 1 }}>
      {stringMessages ? (
        <Messenger
          messages={stringMessages}
          addMessage={addMessage}
          collectionName={collectionNames.STRING}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default StringGroupScreen;
