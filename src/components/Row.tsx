import React from "react";
import { StyleSheet, View } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: object;
}

const Row: React.FC<RowProps> = ({ children, style = {} }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});

export default Row;
