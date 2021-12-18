import Center from "@/components/Center";
import GoBackButton from "@/components/chats/GoBackButton";
import { useUsersCollection } from "@/hooks/useFirebase";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from "react-native-paper";

interface OtherUserProfileScreenProps {
  route: {
    params: {
      uid: string;
    };
  };
  navigation: any;
}

const OtherUserProfileScreen: React.FC<OtherUserProfileScreenProps> = ({
  route,
  navigation,
}) => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(false);
  const { getUser } = useUsersCollection();
  const userId = route.params.uid;

  useEffect(() => {
    fetchUser(userId);
  }, [route.params.uid]);

  const fetchUser = async (userId: string) => {
    navigation.setOptions({ title: "Loading..." });
    setLoading(true);
    const usr = await getUser(userId);
    if (usr) {
      navigation.setOptions({ title: `${usr.name}'s Profile` });
      setUser(usr);
      setLoading(false);
    }
  };

  const avatar = user?.photoURL
    ? { uri: user?.photoURL }
    : require("../../../assets/images/no-user.jpg");

  return user && !loading ? (
    <View>
      <GoBackButton />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image size={104} source={avatar} style={{ marginRight: 10 }} />
        <Title>{user.name}</Title>
        <Paragraph>{user.email}</Paragraph>
        <View
          style={{
            width: "100%",
            marginVertical: 10,
          }}>
          <Divider />
        </View>
        <View style={{ margin: 20 }}>
          <Headline>Favourite instrument:</Headline>
          <Subheading style={{ textAlign: "center" }}>
            {user.favInstrument ? user.favInstrument : "Don't have one"}
          </Subheading>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default OtherUserProfileScreen;
