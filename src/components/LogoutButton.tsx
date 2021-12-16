import { config } from "@/config/googleSigninConfig";
import useRedux from "@/hooks/useRedux";
import React, { useState } from "react";
import * as Google from "expo-google-app-auth";
import { ActivityIndicator, Button } from "react-native-paper";
import { View } from "react-native";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { logoutUser, user } = useRedux();
  const logout = async () => {
    setLoading(true);
    if (user) {
      const accessToken = user.accessToken;
      try {
        await Google.logOutAsync({ accessToken, ...config });
        logoutUser();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  return loading ? (
    <View style={{ marginHorizontal: 10 }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Button onPress={logout}>Logout</Button>
  );
};

export default LogoutButton;
