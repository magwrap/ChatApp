import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseConfig } from "@/config/firebaseConfig";

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

// Initialize Firebase

const useFirebase = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  const signInToFirebase = (token: string) => {
    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("you have logged in! User: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const signOutFromFirebase = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    user,
    signInToFirebase,
    signOutFromFirebase,
  };
};

export default useFirebase;
