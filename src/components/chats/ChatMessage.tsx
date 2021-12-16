import { useUsersCollection } from "@/hooks/useFirebase";
import useRedux from "@/hooks/useRedux";
import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Avatar, Colors, Text } from "react-native-paper";

interface ChatMessageProps {
  message: Data<DocumentData, "", "">;
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const [clicked, toggleClick] = useState(false);
  const [messageAuthor, setMessageAuthor] = useState("");
  const { text, uid, photoURL, createdAt } = props.message;
  const messageDate = new Date(createdAt * -1);
  let displayDate =
    messageDate.toLocaleDateString() + " " + messageDate.toLocaleTimeString();

  const { user } = useRedux();
  const { getUser } = useUsersCollection();

  const messageClass = uid === user?.userData.id ? "sent" : "recived";

  const getMessageAuthor = async (
    uid: string,
    messageClass: "sent" | "recived"
  ) => {
    if (messageClass === "recived") {
      const recivedUser = await getUser(uid);
      setMessageAuthor(recivedUser ? recivedUser.name : "Not found...");
      console.log(messageAuthor);
      toggleClick(!clicked);
    } else {
      setMessageAuthor(user?.userData.name ? user?.userData.name : "error");
      toggleClick(!clicked);
    }
  };

  return (
    <View
      style={
        messageClass === "recived" ? styles.messageRecived : styles.messageSent
      }>
      {messageClass === "recived" ? (
        <Avatar.Image size={29} source={{ uri: photoURL }} />
      ) : null}

      <View style={styles.message}>
        <TouchableWithoutFeedback
          onPress={() => getMessageAuthor(uid, messageClass)}>
          <View
            style={[
              styles.bubble,
              messageClass === "recived"
                ? styles.bubbleRecived
                : styles.bubbleSent,
            ]}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </TouchableWithoutFeedback>
        {clicked && (
          <Text style={styles.info}>
            {displayDate} - {messageAuthor}
          </Text>
        )}
      </View>
      {messageClass === "recived" ? null : (
        <Avatar.Image size={29} source={{ uri: photoURL }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageSent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 7,
    margin: 2,
  },
  messageRecived: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 7,
    margin: 2,
  },
  message: {
    margin: 2.5,
    marginTop: 7,
    paddingTop: 5,
    marginHorizontal: 5,
    maxWidth: "80%",
  },

  bubble: {
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 10,
  },
  bubbleRecived: {
    backgroundColor: Colors.blueGrey300,
    borderTopStartRadius: 10,
  },
  bubbleSent: { backgroundColor: Colors.green700, borderTopEndRadius: 10 },

  text: {
    margin: 2.2,
  },
  info: {
    fontSize: 9,
    textAlign: "right",
    margin: 2,
  },
});

export default ChatMessage;
