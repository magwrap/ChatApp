import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Title } from "react-native-paper";

interface GroupButtonProps {
  title: string;
  goToFunc: () => void;
  image: { uri: string };
}

const GroupButton: React.FC<GroupButtonProps> = ({
  title,
  goToFunc,
  image,
}) => {
  return (
    <TouchableOpacity onPress={goToFunc} style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}>
        <Title style={styles.text}>{title}</Title>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
    margin: 20,
    borderRadius: 20,
  },
  text: {
    padding: 2,
    margin: 10,
    textAlign: "center",
    backgroundColor: Colors.grey200,
    width: 130,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
});

export default GroupButton;
