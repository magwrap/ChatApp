import { useUsersCollection } from "@/hooks/useFirebase";
import useRedux from "@/hooks/useRedux";
import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors, Text } from "react-native-paper";
import ChatAvatarIcon from "./ChatAvatarIcon";

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
    } else {
      setMessageAuthor(user?.userData.name ? user?.userData.name : "error");
    }
    toggleClick(!clicked);
    setTimeout(() => toggleClick(false), 5000);
  };

  return (
    <View
      style={[
        styles.messageContainer,
        messageClass === "recived" ? styles.messageRecived : styles.messageSent,
      ]}>
      {messageClass === "recived" ? (
        <ChatAvatarIcon photoURL={photoURL} uid={uid} />
      ) : null}
      <View style={{ maxWidth: "80%" }}>
        <View
          style={[
            styles.message,
            messageClass === "recived"
              ? { alignSelf: "flex-start" }
              : { alignSelf: "flex-end" },
          ]}>
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
        </View>
        <View>
          {clicked && (
            <Text
              style={[
                styles.info,
                messageClass === "recived"
                  ? { textAlign: "left" }
                  : { textAlign: "right" },
              ]}>
              {displayDate} - {messageAuthor}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: { flexDirection: "row", margin: 2 },
  messageSent: {
    justifyContent: "flex-end",
    marginRight: 7,
  },
  messageRecived: {
    justifyContent: "flex-start",
    marginLeft: 7,
  },
  message: {
    margin: 2.5,
    marginTop: 2,
    paddingTop: 5,
    marginHorizontal: 5,
  },

  bubble: {
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 10,
  },
  bubbleRecived: {
    borderTopStartRadius: 10,
    backgroundColor: Colors.grey400,
  },
  bubbleSent: {
    backgroundColor: Colors.lightGreen400,
    borderTopEndRadius: 10,
  },

  text: {
    margin: 2.2,
  },
  info: {
    fontSize: 9,
    margin: 2,
  },
});

export default ChatMessage;
