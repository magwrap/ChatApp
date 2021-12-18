import Messenger from "@/components/chats/Messenger";
import { collectionNames, useMessagesCollections } from "@/hooks/useFirebase";
import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface BrassGroupScreenProps {
  navigation: any;
}

const BrassGroupScreen: React.FC<BrassGroupScreenProps> = ({ navigation }) => {
  const [limitNum, setLimitNum] = useState(25);
  const { brassMessages, addMessage, getCollectionSize } =
    useMessagesCollections();

  return (
    <View style={{ flex: 1 }}>
      {brassMessages ? (
        <Messenger
          messages={brassMessages}
          addMessage={addMessage}
          limitNum={limitNum}
          setLimitNum={setLimitNum}
          collectionName={collectionNames.BRASS}
          getCollectionSize={getCollectionSize}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default BrassGroupScreen;
