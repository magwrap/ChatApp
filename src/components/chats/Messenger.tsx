import { collectionNames } from "@/hooks/useFirebase";
import useRedux from "@/hooks/useRedux";
import { DocumentData } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { RefreshControl, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import ChatMessage from "./ChatMessage";

type groupCollectionNames =
  | collectionNames.BRASS
  | collectionNames.PERCUSSION
  | collectionNames.STRING
  | collectionNames.MESSAGES;

interface MessengerProps {
  messages: Data<DocumentData, "", "">[] | undefined;
  addMessage:
    | ((text: string, uid: string, photoURL: string) => Promise<void>)
    | ((
        text: string,
        uid: string,
        photoURL: string,
        collectionName: groupCollectionNames
      ) => Promise<void>);
  collectionName: groupCollectionNames;
  limitNum: number;
  setLimitNum: React.Dispatch<React.SetStateAction<number>>;
  getCollectionSize: (collectionName: groupCollectionNames) => Promise<number>;
}

const Messenger: React.FC<MessengerProps> = ({
  messages,
  addMessage,
  collectionName,
  limitNum,
  setLimitNum,
  getCollectionSize,
}) => {
  const [messageValue, setMessageValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useRedux();
  const userData = user?.userData;

  const [refreshing, setRefreshing] = React.useState(false);

  //async functions
  const sendMessage = async () => {
    const msg = messageValue;
    setMessageValue("");
    if (userData?.id && userData?.photoUrl && msg) {
      setLoading(true);
      if (collectionName) {
        await addMessage(msg, userData?.id, userData?.photoUrl, collectionName);
      }

      setLoading(false);
    }
  };

  //flatlist functions
  const renderItem = (message: Data<DocumentData, "", "">) => {
    return <ChatMessage message={message.item} />;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLimitNum(limitNum);
    setInterval(() => setRefreshing(false), 1000);
  }, []);

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const onEndReached = async ({
    distanceFromEnd,
  }: {
    distanceFromEnd: number;
  }) => {
    if (!onEndReachedCalledDuringMomentum) {
      console.log("fetching data... distance from end: ", distanceFromEnd);

      const size = await getCollectionSize(collectionName);
      console.log("collection size: ", size);
      if (limitNum !== size) {
        if (limitNum + 25 <= size) {
          setLimitNum(limitNum + 25);
        } else {
          setLimitNum(size);
        }
      }
      console.log("limit num: ", limitNum);
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {messages && (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(message) => message.id}
          inverted={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
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
