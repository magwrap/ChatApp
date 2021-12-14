import { useSelector } from "react-redux";
import { State } from "@/state/index";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppStackNavigator from "./App/AppStackNavigator";
import AuthNavigator from "./Auth/AuthNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const user = useSelector((state: State) => state.user);
  return (
    <NavigationContainer>
      {user ? <AppStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
