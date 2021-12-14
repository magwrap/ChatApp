import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Routes from "@/navigation/Routes";
import useCachedResources from "./src/hooks/useCachedResources";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/state";
import LoadingScreen from "@/screens/LoadingScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

export default function App() {
  const isLoadingComplete = useCachedResources();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "green",
      accent: "yellow",
    },
  };

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  } else {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <Routes />
          <StatusBar />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
