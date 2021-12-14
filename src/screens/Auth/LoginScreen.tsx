import Center from "@/components/Center";
import React, { useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import { config } from "@/config/googleSigninConfig";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useRedux from "@/hooks/useRedux";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useRedux();

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await Google.logInAsync(config);
      const { type } = result;
      if (type == "success") {
        const { user, accessToken } = result;
        if (user && accessToken) {
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
    <Center>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <TouchableOpacity
            onPress={handleSignInWithGoogle}
            style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="google" size={25} color="black" />
            <Button>Sign In with Google</Button>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          ) : null}
        </View>
      )}
    </Center>
  );
};

export default LoginScreen;
