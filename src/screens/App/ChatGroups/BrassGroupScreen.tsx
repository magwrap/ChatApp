import Messenger from "@/components/chats/Messenger";
import {
  collectionNames,
  useGroupMessagesCollections,
} from "@/hooks/useFirebase";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Subheading } from "react-native-paper";

interface BrassGroupScreenProps {
  navigation: any;
}

const BrassGroupScreen: React.FC<BrassGroupScreenProps> = ({ navigation }) => {
  const { brassMessages, addMessage } = useGroupMessagesCollections();

  return (
    <View style={{ flex: 1 }}>
      {brassMessages ? (
        <Messenger
          messages={brassMessages}
          addMessage={addMessage}
          collectionName={collectionNames.BRASS}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default BrassGroupScreen;
