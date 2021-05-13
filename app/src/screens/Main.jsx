import React from "react";
import BottomNavigator from "../components/navigators/BottomNavigator";
import FloatingButton from "../components/buttons/FloatingButton";

export default function Main({ navigation }) {
  return (
    <>
      <FloatingButton action={() => navigation.navigate("NewOrder")} />

      <BottomNavigator />
    </>
  );
}
