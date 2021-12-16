import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface GroupChatScreenProps {
  navigation: any;
}

const GroupChatScreen: React.FC<GroupChatScreenProps> = ({ navigation }) => {
  const goToBrassGroupScreen = () => {
    navigation.navigate("BrassGroup");
  };

  const goToPercussionGroupScreen = () => {
    navigation.navigate("PercussionGroup");
  };

  const goToStringGroupScreen = () => {
    navigation.navigate("StringGroup");
  };
  return (
    <View>
      <Button onPress={goToBrassGroupScreen}>Brass Group</Button>
      <Button onPress={goToPercussionGroupScreen}>Percussion Group</Button>
      <Button onPress={goToStringGroupScreen}>String Group</Button>
    </View>
  );
};

export default GroupChatScreen;
