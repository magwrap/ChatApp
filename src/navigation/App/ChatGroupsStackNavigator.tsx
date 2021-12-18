import GroupChatHeader from "@/components/chats/GroupChatHeader";
import { questionOfTheDay } from "@/config/questionOfTheDay";
import BrassGroupScreen from "@/screens/App/ChatGroups/BrassGroupScreen";
import PercussionGroupScreen from "@/screens/App/ChatGroups/PercussionGroupScreen";
import StringGroupScreen from "@/screens/App/ChatGroups/StringGroupScreen";
import GroupChatScreen from "@/screens/App/GroupChatsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

interface ChatGroupsStackNavigatorProps {}

const Stack = createNativeStackNavigator();

const ChatGroupsStackNavigator: React.FC<ChatGroupsStackNavigatorProps> =
  ({}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="GroupChat"
          component={GroupChatScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BrassGroup"
          component={BrassGroupScreen}
          options={{
            header: () => (
              <GroupChatHeader desc={questionOfTheDay.brassQuestion} />
            ),
          }}
        />

        <Stack.Screen
          name="PercussionGroup"
          component={PercussionGroupScreen}
          options={{
            header: () => (
              <GroupChatHeader desc={questionOfTheDay.percussionQuestion} />
            ),
          }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="StringGroup"
            component={StringGroupScreen}
            options={{
              header: () => (
                <GroupChatHeader desc={questionOfTheDay.stringQuestion} />
              ),
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default ChatGroupsStackNavigator;
