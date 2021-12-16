import { Avatar, Divider, Paragraph, Title } from "react-native-paper";

import useRedux from "@/hooks/useRedux";
import { View } from "react-native";
import React from "react";

interface ProfilScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfilScreenProps> = ({ navigation }) => {
  const { user } = useRedux();
  const userData = user?.userData;

  return (
    <View style={{ margin: 2 }}>
      {userData && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}>
          <Avatar.Image
            size={104}
            source={{ uri: userData.photoUrl }}
            style={{ marginRight: 10 }}
          />
          <Title>{userData.name}</Title>
          <Paragraph>{userData.email}</Paragraph>

          <View
            style={{
              width: "100%",
              marginVertical: 10,
            }}>
            <Divider />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
