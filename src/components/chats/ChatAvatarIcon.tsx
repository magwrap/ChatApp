import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, Avatar } from "react-native-paper";

interface ChatAvatarIconProps {
  photoURL: string;
  uid: string;
}

const ChatAvatarIcon: React.FC<ChatAvatarIconProps> = ({ photoURL, uid }) => {
  const { navigate } = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const viewProfile = () => {
    closeMenu();
    navigate("Other User Profile", { uid });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}>
        <Menu
          contentStyle={{ margin: 15 }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image size={29} source={{ uri: photoURL }} />
            </TouchableOpacity>
          }>
          <Menu.Item
            style={{ height: 30 }}
            icon="account"
            onPress={viewProfile}
            title="View Profile"
          />
        </Menu>
      </View>
    </View>
  );
};

export default ChatAvatarIcon;
