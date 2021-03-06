import Center from "@/components/Center";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Caption,
  Colors,
  Text,
  Title,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import { config } from "@/config/googleSigninConfig";
import { Platform, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useRedux from "@/hooks/useRedux";
import { useUsersCollection } from "@/hooks/useFirebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface LoginScreenProps {}
//TODO: dodac token loop zeby automatycznie logowalo
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useRedux();
  const { addUser } = useUsersCollection();

  const handleSignInWithGoogle = () => {
    if (Platform.OS === "web") {
      GoogleSignInWeb();
    } else {
      GoogleSignInMobile();
    }
  };

  const GoogleSignInWeb = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const user = result.user;
        if (user && accessToken) {
          await addUser({
            email: user.email ? user.email : "",
            name: user.displayName ? user.displayName : "",
            id: user.uid,
          });
          loginUser(
            {
              email: user.email ? user.email : "",
              name: user.displayName ? user.displayName : "",
              id: user.uid,
            },
            accessToken ? accessToken : ""
          );
        }
      } else {
        setLoading(false);
        setErrorMessage("Google signin was cancelled");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage("An error accured. Check your network and try again");
    }
  };

  const GoogleSignInMobile = async () => {
    setLoading(true);
    try {
      const result = await Google.logInAsync(config);
      const { type } = result;
      if (type == "success") {
        const { user, accessToken } = result;
        if (user && accessToken) {
          await addUser(user);
          loginUser(user, accessToken);
        } else {
          setLoading(false);
          setErrorMessage("couldn't find a user...");
        }
      } else {
        setLoading(false);
        setErrorMessage("Google signin was cancelled");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage("An error accured. Check your network and try again");
    }
  };

  return (
    <>
      {loading ? (
        <Center>
          <ActivityIndicator size="large" />
          <Caption>Loading...</Caption>
        </Center>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text
            style={{ fontSize: 50, fontWeight: "600", color: Colors.brown700 }}>
            InstruChat!
          </Text>

          <View
            style={{
              marginTop: 20,
              margin: 50,
              backgroundColor: Colors.green200,
              borderRadius: 20,
              borderTopEndRadius: 0,
              padding: 20,
            }}>
            <Title>
              A chat app where you can discust about your favourite instruments!
            </Title>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSignInWithGoogle}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign
                name="google"
                mode="contained"
                size={25}
                color="black"
              />
              <Button>Sign In with Google</Button>
            </TouchableOpacity>
            {errorMessage ? (
              <Text style={{ color: Colors.red800 }}>{errorMessage}</Text>
            ) : null}
          </View>
        </View>
      )}
    </>
  );
};

export default LoginScreen;
