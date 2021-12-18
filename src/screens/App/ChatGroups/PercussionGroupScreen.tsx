import Messenger from "@/components/chats/Messenger";
import { collectionNames, useMessagesCollections } from "@/hooks/useFirebase";
import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface PercussionGroupScreenProps {}

const PercussionGroupScreen: React.FC<PercussionGroupScreenProps> = ({}) => {
  const [limitNum, setLimitNum] = useState(25);
  const { percussionMessages, addMessage, getCollectionSize } =
    useMessagesCollections(limitNum);

  return (
    <View style={{ flex: 1 }}>
      {percussionMessages ? (
        <Messenger
          messages={percussionMessages}
          addMessage={addMessage}
          limitNum={limitNum}
          setLimitNum={setLimitNum}
          collectionName={collectionNames.PERCUSSION}
          getCollectionSize={getCollectionSize}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default PercussionGroupScreen;
