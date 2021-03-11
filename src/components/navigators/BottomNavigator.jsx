import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import Home from "../../screens/Home";
import Sales from "../../screens/Sales";
import Purchases from "../../screens/Purchases";
import Balance from "../../screens/Balance";
import Notes from "../../screens/Notes";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Vendas"
        component={Sales}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Compras"
        component={Purchases}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Balanço"
        component={Balance}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="balance-scale" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Anotações"
        component={Notes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="sticky-note" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
