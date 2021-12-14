import Center from "@/components/Center";
import React from "react";
import { Button, Text } from "react-native-paper";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <Center>
      <Text>Register Screen</Text>
      <Button onPress={goToLogin}>Sign In</Button>
    </Center>
  );
};

export default RegisterScreen;
