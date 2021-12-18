import React, { useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {
  ActivityIndicator,
  Avatar,
  Colors,
  Drawer,
  Paragraph,
} from "react-native-paper";
import { config } from "@/config/googleSigninConfig";
import useRedux from "@/hooks/useRedux";
import * as Google from "expo-google-app-auth";
import { View, StyleSheet } from "react-native";

const DrawerCustomContent = (props: DrawerContentComponentProps) => {
  const [loading, setLoading] = useState(false);
  const { logoutUser, user } = useRedux();
  const logout = async () => {
    setLoading(true);
    if (user) {
      const accessToken = user.accessToken;
      try {
        await Google.logOutAsync({ accessToken, ...config });
        logoutUser();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const avatar = user?.userData.photoUrl
    ? { uri: user?.userData.photoUrl }
    : require("../../../assets/images/no-user.jpg");
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          <Avatar.Image size={48} source={avatar} style={{ marginRight: 10 }} />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Paragraph style={{ fontSize: 18, textAlign: "center" }}>
              {user?.userData.name}
            </Paragraph>
            <Paragraph style={{ fontSize: 9, textAlign: "center" }}>
              {user?.userData.email}
            </Paragraph>
          </View>
        </View>
        <Drawer.Section>
          {props.state.routes.map(
            (route, i) =>
              route.name !== "Other User Profile" && (
                <Drawer.Item
                  key={i}
                  style={styles.mainItem}
                  icon={route.name === "Chats" ? "chat" : "account"}
                  label={route.name}
                  onPress={() => props.navigation.navigate(route.name)}
                />
              )
          )}
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Drawer.Item
            style={styles.logoutItem}
            icon="logout"
            label="Logout"
            onPress={logout}
          />
        )}
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    backgroundColor: Colors.green100,
    padding: 10,
    borderRadius: 10,
  },
  mainItem: { backgroundColor: Colors.green50 },
  logoutItem: { backgroundColor: Colors.brown100 },
});

export default DrawerCustomContent;
