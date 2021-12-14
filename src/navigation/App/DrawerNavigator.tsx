import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatScreen from "@/screens/App/GroupChatsScreen";
import ProfileScreen from "@/screens/App/ProfileScreen";
import TopTabNavigator from "./TopTabNavigator";

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chats" component={TopTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
