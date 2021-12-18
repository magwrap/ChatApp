import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseConfig } from "@/config/firebaseConfig";
import * as Google from "expo-google-app-auth";

initializeApp(firebaseConfig);

export enum collectionNames {
  MESSAGES = "messages",
  BRASS = "brass-messages",
  PERCUSSION = "percussion-messages",
  STRING = "string-messages",
  USERS = "users",
}

const firestore = getFirestore();

const useMessagesCollections = (limitNum = 25) => {
  const messagesRef = collection(firestore, collectionNames.MESSAGES);
  const brassMessagesRef = collection(firestore, collectionNames.BRASS);
  const percussionMessagesRef = collection(
    firestore,
    collectionNames.PERCUSSION
  );
  const stringMessagesRef = collection(firestore, collectionNames.STRING);
  const q = query(messagesRef, orderBy("createdAt"), limit(limitNum));

  const brassQuery = query(
    brassMessagesRef,
    orderBy("createdAt"),
    limit(limitNum)
  );
  const percussionQuery = query(
    percussionMessagesRef,
    orderBy("createdAt"),
    limit(limitNum)
  );
  const stringQuery = query(
    stringMessagesRef,
    orderBy("createdAt"),
    limit(limitNum)
  );

  const [messages] = useCollectionData(q, { idField: "id" });
  const [brassMessages] = useCollectionData(brassQuery, { idField: "id" });
  const [percussionMessages] = useCollectionData(percussionQuery, {
    idField: "id",
  });
  const [stringMessages] = useCollectionData(stringQuery, {
    idField: "id",
  });

  const addMessage = async (
    text: string,
    uid: string,
    photoURL: string,
    collectionName:
      | collectionNames.BRASS
      | collectionNames.PERCUSSION
      | collectionNames.STRING
      | collectionNames.MESSAGES
  ) => {
    try {
      await addDoc(collection(firestore, collectionName), {
        text,
        uid,
        photoURL,
        createdAt: -1 * new Date().getTime(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCollectionSize = async (
    collectionName:
      | collectionNames.BRASS
      | collectionNames.PERCUSSION
      | collectionNames.STRING
      | collectionNames.MESSAGES
  ) => {
    let collectionSize = 0;
    switch (collectionName) {
      case collectionNames.MESSAGES:
        const messagesSnap = await getDocs(messagesRef);
        collectionSize = messagesSnap.size;
        break;

      case collectionNames.BRASS:
        const brassSnap = await getDocs(brassMessagesRef);
        collectionSize = brassSnap.size;
        break;

      case collectionNames.PERCUSSION:
        const percussionSnap = await getDocs(percussionMessagesRef);
        collectionSize = percussionSnap.size;
        break;

      case collectionNames.STRING:
        const stringSnap = await getDocs(stringMessagesRef);
        collectionSize = stringSnap.size;
        break;
    }
    return collectionSize;
  };

  return {
    messages,
    brassMessages,
    percussionMessages,
    stringMessages,
    addMessage,
    getCollectionSize,
  };
};

const useUsersCollection = () => {
  const getUser = async (userId: string) => {
    const userRef = doc(firestore, collectionNames.USERS, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  };

  const addUser = async (user: Google.GoogleUser) => {
    if (user.id) {
      try {
        await setDoc(doc(firestore, collectionNames.USERS, user.id), {
          email: user.email ? user.email : "",
          familyName: user.familyName ? user.familyName : "",
          givenName: user.givenName ? user.givenName : "",
          name: user.name ? user.name : "",
          photoURL: user.photoUrl
            ? user.photoUrl
            : "https://firebasestorage.googleapis.com/v0/b/chatapp-335019.appspot.com/o/default-non-user-no-photo-1.jpg?alt=media&token=2f33bb92-bed2-48cc-9c9a-d329403b776c",
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return {
    getUser,
    addUser,
  };
};

export { useMessagesCollections, useUsersCollection };
