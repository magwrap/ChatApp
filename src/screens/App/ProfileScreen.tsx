import Center from "@/components/Center";
import * as React from "react";
import { Avatar, Button, Divider, Paragraph, Title } from "react-native-paper";
import * as Google from "expo-google-app-auth";
import useRedux from "@/hooks/useRedux";
import { View } from "react-native";

interface ProfilScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfilScreenProps> = ({ navigation }) => {
  const { logoutUser, user } = useRedux();
  const logout = () => {
    logoutUser();
    if (user) {
      const accessToken = user.accessToken;
      Google.logOutAsync({ accessToken });
    }
  };
  const userData = user?.userData;

  return (
    <Center>
      {userData && (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image size={34} source={{ uri: userData.photoUrl }} />
            <Title>{userData.name}</Title>
          </View>
          <Paragraph>{userData.email}</Paragraph>
        </View>
      )}

      <Divider />
      <Button onPress={logout}>Logout</Button>
    </Center>
  );
};

export default ProfileScreen;
