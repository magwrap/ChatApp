import Center from "@/components/Center";
import GoBackButton from "@/components/chats/GoBackButton";
import { useUsersCollection } from "@/hooks/useFirebase";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Paragraph,
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

  return user && !loading ? (
    <View>
      <GoBackButton />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image
          size={104}
          source={{ uri: user.photoURL }}
          style={{ marginRight: 10 }}
        />
        <Title>{user.name}</Title>
        <Paragraph>{user.email}</Paragraph>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
};
const styles = StyleSheet.create({});

export default OtherUserProfileScreen;
