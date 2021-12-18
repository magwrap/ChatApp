import Messenger from "@/components/chats/Messenger";
import { collectionNames, useMessagesCollections } from "@/hooks/useFirebase";
import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface StringGroupScreenProps {
  navigation: any;
}

const StringGroupScreen: React.FC<StringGroupScreenProps> = ({
  navigation,
}) => {
  const [limitNum, setLimitNum] = useState(25);
  const { stringMessages, addMessage, getCollectionSize } =
    useMessagesCollections();

  return (
    <View style={{ flex: 1 }}>
      {stringMessages ? (
        <Messenger
          messages={stringMessages}
          addMessage={addMessage}
          limitNum={limitNum}
          setLimitNum={setLimitNum}
          collectionName={collectionNames.STRING}
          getCollectionSize={getCollectionSize}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default StringGroupScreen;
