import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicChatScreen from "@/screens/App/PublicChatScreen";
import ChatGroupsStackNavigator from "./ChatGroupsStackNavigator";
import { Colors } from "react-native-paper";

interface TopTabNavigatorProps {}

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC<TopTabNavigatorProps> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="ChatGroupsStack"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { borderTopWidth: 0.2, backgroundColor: Colors.green100 },
        tabBarPressColor: Colors.brown200,
        tabBarIndicatorStyle: { backgroundColor: Colors.brown200 },
      }}>
      <Tab.Screen
        name="ChatGroupsStack"
        component={ChatGroupsStackNavigator}
        options={{ tabBarLabel: "Groups" }}
      />
      <Tab.Screen
        name="PublicChatScreen"
        component={PublicChatScreen}
        options={{ tabBarLabel: "Public" }}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;

//dodaj
//https://reactnavigation.org/docs/material-top-tab-navigator
