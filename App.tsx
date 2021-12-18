import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Routes from "@/navigation/Routes";
import useCachedResources from "./src/hooks/useCachedResources";
import {
  Colors,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/state";
import LoadingScreen from "@/screens/LoadingScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  // "Warning: Async Storage has been extracted from react-native core",
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
]);

export default function App() {
  const isLoadingComplete = useCachedResources();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.green400,
      accent: Colors.brown500,
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
