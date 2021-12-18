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
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseConfig } from "@/config/firebaseConfig";
import { GoogleUser } from "expo-google-app-auth";

initializeApp(firebaseConfig);

export enum collectionNames {
  MESSAGES = "messages",
  BRASS = "brass-messages",
  PERCUSSION = "percussion-messages",
  STRING = "string-messages",
  USERS = "users",
}

const firestore = getFirestore();
const database = getDatabase();

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

export type User = GoogleUser & {
  favInstrument: string;
};

const useUsersCollection = () => {
  const getUser = async (userId: string) => {
    try {
      const userRef = doc(firestore, collectionNames.USERS, userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const addUser = async (user: GoogleUser) => {
    if (user.id) {
      try {
        const userRef = doc(firestore, collectionNames.USERS, user.id);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(doc(firestore, collectionNames.USERS, user.id), {
            email: user.email ? user.email : "",
            familyName: user.familyName ? user.familyName : "",
            givenName: user.givenName ? user.givenName : "",
            name: user.name ? user.name : "",
            photoURL: user.photoUrl ? user.photoUrl : "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUser = async (userId: string, updateData: object) => {
    try {
      const userRef = doc(firestore, collectionNames.USERS, userId);
      await updateDoc(userRef, updateData);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getUser,
    addUser,
    updateUser,
  };
};

const useInstrumentsDatabase = () => {
  const dbRef = ref(getDatabase());
  const getInstruments = async () => {
    try {
      const snapshot = await get(child(dbRef, `instruments`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  return {
    getInstruments,
  };
};

export { useMessagesCollections, useUsersCollection, useInstrumentsDatabase };
