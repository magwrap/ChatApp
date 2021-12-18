import { Avatar, Divider, Paragraph, Title } from "react-native-paper";

import useRedux from "@/hooks/useRedux";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useInstrumentsDatabase } from "@/hooks/useFirebase";
import ViewInstrumentList from "@/components/profile/ViewInstrumentList";

interface ProfilScreenProps {}
//TODO: kazdy uzytkownik ma swoj ulubiony instrument i moze se go ustawic

const ProfileScreen: React.FC<ProfilScreenProps> = () => {
  const { user } = useRedux();
  const { getInstruments } = useInstrumentsDatabase();
  const [instrumentList, setInstrumentList] = useState([""]);

  const userData = user?.userData;

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = async () => {
    const instruments: string[] = await getInstruments();

    setInstrumentList(instruments);
  };

  const avatar = userData?.photoUrl
    ? { uri: userData.photoUrl }
    : require("../../../assets/images/no-user.jpg");

  return (
    <View style={{ margin: 2, flex: 1 }}>
      {userData && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}>
          <Avatar.Image
            size={104}
            source={avatar}
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

      <ViewInstrumentList instrumentList={instrumentList} />
    </View>
  );
};

export default ProfileScreen;
