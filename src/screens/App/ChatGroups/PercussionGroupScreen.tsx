import Messenger from "@/components/chats/Messenger";
import {
  collectionNames,
  useGroupMessagesCollections,
} from "@/hooks/useFirebase";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface PercussionGroupScreenProps {
  navigation: any;
}

const PercussionGroupScreen: React.FC<PercussionGroupScreenProps> = ({
  navigation,
}) => {
  const { percussionMessages, addMessage } = useGroupMessagesCollections();

  return (
    <View style={{ flex: 1 }}>
      {percussionMessages ? (
        <Messenger
          messages={percussionMessages}
          addMessage={addMessage}
          collectionName={collectionNames.PERCUSSION}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default PercussionGroupScreen;
