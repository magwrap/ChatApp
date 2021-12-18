import GroupButton from "@/components/chats/GroupButton";
import * as React from "react";
import { View } from "react-native";

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
  const brassImg = require("../../../assets/images/brass.jpg");
  const percussionImg = require("../../../assets/images/percussion.jpg");
  const stringImg = require("../../../assets/images/string.jpg");
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <GroupButton
        title="Brasses"
        goToFunc={goToBrassGroupScreen}
        image={brassImg}
      />
      <GroupButton
        title="Percussions"
        goToFunc={goToPercussionGroupScreen}
        image={percussionImg}
      />
      <GroupButton
        title="Strings"
        goToFunc={goToStringGroupScreen}
        image={stringImg}
      />
    </View>
  );
};

export default GroupChatScreen;
