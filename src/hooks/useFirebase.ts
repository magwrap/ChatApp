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

const usePublicMessagesCollection = () => {
  const messagesRef = collection(firestore, collectionNames.MESSAGES);
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const addMessage = async (text: string, uid: string, photoURL: string) => {
    try {
      await addDoc(collection(firestore, collectionNames.MESSAGES), {
        text,
        uid,
        photoURL,
        createdAt: -1 * new Date().getTime(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    messages,
    addMessage,
  };
};

const useGroupMessagesCollections = () => {
  const brassBessagesRef = collection(firestore, collectionNames.BRASS);
  const percussionBessagesRef = collection(
    firestore,
    collectionNames.PERCUSSION
  );
  const stringBessagesRef = collection(firestore, collectionNames.STRING);

  const brassQuery = query(brassBessagesRef, orderBy("createdAt"), limit(25));
  const percussionQuery = query(
    percussionBessagesRef,
    orderBy("createdAt"),
    limit(25)
  );
  const stringQuery = query(stringBessagesRef, orderBy("createdAt"), limit(25));

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

  return {
    brassMessages,
    percussionMessages,
    stringMessages,
    addMessage,
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
      console.log("adding user: ", user);
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

export {
  usePublicMessagesCollection,
  useGroupMessagesCollections,
  useUsersCollection,
};
