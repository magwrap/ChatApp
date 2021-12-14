import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupChatScreen from "@/screens/App/GroupChatsScreen";
import PrivateChatScreen from "@/screens/App/PrivateChatScreen";

interface TopTabNavigatorProps {}

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC<TopTabNavigatorProps> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="GroupChatNavigation"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "white" },
      }}>
      <Tab.Screen
        name="GroupChatNavigation"
        component={GroupChatScreen}
        options={{ tabBarLabel: "Groups" }}
      />
      <Tab.Screen
        name="PrivateChatNavigation"
        component={PrivateChatScreen}
        options={{ tabBarLabel: "Private" }}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;

//dodaj
//https://reactnavigation.org/docs/material-top-tab-navigator
