import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Colors, Drawer } from "react-native-paper";

const DrawerCustomContent = (props: DrawerContentComponentProps) => {
  console.log(props);
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        {props.state.routes.map((route, i) => (
          <Drawer.Item
            key={i}
            style={{ backgroundColor: Colors.green100 }}
            icon={route.name === "Chats" ? "chat" : "account"}
            label={route.name}
            onPress={() => props.navigation.navigate(route.name)}
          />
        ))}
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item
          style={{ backgroundColor: Colors.brown100 }}
          icon="logout"
          label="Logout"
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerCustomContent;
