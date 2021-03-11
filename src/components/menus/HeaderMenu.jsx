import React from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';

export default function HeaderMenu() {
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const menu = React.createRef();

  function hideMenu() {
    menu.current.hide();
  }

  function showMenu() {
    menu.current.show();
  }

  function handleEditProfile() {
    hideMenu();
    navigation.navigate('EditProfile');
  }

  function handleUpdatePassword() {
    hideMenu();
    navigation.navigate('UpdatePassword');
  }

  function handleLogout() {
    hideMenu();
    logout();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        ref={menu}
        button={(
          <MaterialIcons
            name="menu"
            size={30}
            onPress={showMenu}
          />
        )}
      >
        <MenuItem onPress={handleEditProfile}>Editar Perfil</MenuItem>
        <MenuItem onPress={handleUpdatePassword}>Atualizar Senha</MenuItem>
        <MenuDivider />
        <MenuItem onPress={handleLogout}>Sair</MenuItem>
        {/* <MenuItem onPress={hideMenu} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
      </Menu>
    </View>
  );
}
