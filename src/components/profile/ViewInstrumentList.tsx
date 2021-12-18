import { useUsersCollection } from "@/hooks/useFirebase";
import useRedux from "@/hooks/useRedux";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Colors, List } from "react-native-paper";

interface ViewInstrumentListProps {
  instrumentList: string[];
}

const ViewInstrumentList: React.FC<ViewInstrumentListProps> = ({
  instrumentList,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [favInstrument, setFavInstrument] = React.useState("");

  useEffect(() => {
    getCurrentUserFavInstrument();
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const { updateUser, getUser } = useUsersCollection();
  const { user } = useRedux();

  const getCurrentUserFavInstrument = async () => {
    if (user?.userData.id) {
      const result = await getUser(user?.userData.id);
      result && setFavInstrument(result.favInstrument);
    }
  };

  const chooseFavInstrument = (instrumentName: string) => {
    setFavInstrument(instrumentName);
    if (user?.userData.id) {
      updateUser(user.userData.id, { favInstrument: instrumentName });
    }
  };
  return (
    <List.Section title="Choose your favourite instrument">
      <List.Accordion
        title="Instrument"
        left={(props) => <List.Icon {...props} icon="playlist-music" />}
        expanded={expanded}
        onPress={handlePress}>
        {instrumentList[0] ? (
          <ScrollView>
            {instrumentList.map((instrumentName, i) => (
              <List.Item
                key={i}
                title={instrumentName}
                style={
                  instrumentName === favInstrument
                    ? { backgroundColor: Colors.green200 }
                    : {}
                }
                onPress={() => chooseFavInstrument(instrumentName)}
                left={(props) => <List.Icon {...props} icon="account-music" />}
                right={(props) =>
                  instrumentName === favInstrument ? (
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        {...props}
                        style={{ fontStyle: "italic", fontSize: 12 }}>
                        Selected
                      </Text>
                    </View>
                  ) : null
                }
              />
            ))}
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </List.Accordion>
    </List.Section>
  );
};
const styles = StyleSheet.create({});

export default ViewInstrumentList;
