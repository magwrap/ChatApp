import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/Auth/LoginScreen";

interface AppStackNavigatorProps {}

const Stack = createNativeStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
