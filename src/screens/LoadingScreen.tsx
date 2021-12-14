import React from "react";
import { ActivityIndicator } from "react-native";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  return <ActivityIndicator size="large" />;
};

export default LoadingScreen;
