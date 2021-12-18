import Messenger from "@/components/chats/Messenger";
import { collectionNames, useMessagesCollections } from "@/hooks/useFirebase";
import * as React from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

interface PublicChatScreenProps {}

const PublicChatScreen: React.FC<PublicChatScreenProps> = () => {
  const [limitNum, setLimitNum] = useState(25);
  const { messages, addMessage, getCollectionSize } =
    useMessagesCollections(limitNum);
  return messages ? (
    <Messenger
      messages={messages}
      addMessage={addMessage}
      limitNum={limitNum}
      setLimitNum={setLimitNum}
      getCollectionSize={getCollectionSize}
      collectionName={collectionNames.MESSAGES}
    />
  ) : (
    <ActivityIndicator />
  );
};

export default PublicChatScreen;
