import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "@/screens/App/ProfileScreen";
import TopTabNavigator from "./TopTabNavigator";
import LogoutButton from "@/components/LogoutButton";
import ChatHeaderText from "@/components/chats/ChatHeaderText";
import { Colors } from "react-native-paper";
import DrawerCustomContent from "./DrawerCustomContent";
import OtherUserProfileScreen from "@/screens/App/OtherUserProfileScreen";

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.white,
        },
      }}
      initialRouteName="Chats"
      drawerContent={(props) => <DrawerCustomContent {...props} />}>
      <Drawer.Screen
        name="Chats"
        component={TopTabNavigator}
        options={{
          headerStyle: {
            backgroundColor: Colors.green300,
          },
          headerRight: () => <ChatHeaderText />,
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green300,
          },
          headerRight: () => <LogoutButton />,
        }}
      />
      <Drawer.Screen
        name="Other User Profile"
        component={OtherUserProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green300,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
