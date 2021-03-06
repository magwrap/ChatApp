import React from "react";
import ModalScreen from "@/screens/App/ModalScreen";
import NotFoundScreen from "@/screens/App/NotFoundScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";

interface AppStackNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
        // fallbackscreen
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        {/* zewnetrzny poza tabsami */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
