import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HeaderMenu from "./components/menus/HeaderMenu";

import Login from "./screens/Login";
import Register from "./screens/Register";
import EditProfile from "./screens/EditProfile";
import UpdatePassword from "./screens/UpdatePassword";
import Main from "./screens/Main";
import NewOrder from "./screens/NewOrder";
import EditOrder from "./screens/EditOrder";

import { AuthContext } from "./contexts/AuthContext";

const Stack = createStackNavigator();

export default function Routes() {
  const { isSignedIn, user } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          title: user && user.displayName ? user.displayName : "Olá!",
          headerRight: () => <HeaderMenu />,
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      >
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{
                title: "Novo Registro",
              }}
            />
            <Stack.Screen
              name="EditOrder"
              component={EditOrder}
              options={{
                title: "Editar Registro",
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: "Editar Perfil",
              }}
            />
            <Stack.Screen
              name="UpdatePassword"
              component={UpdatePassword}
              options={{
                title: "Atualizar Senha",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
