import React from "react";
import "./firebase";
import { YellowBox } from "react-native";
import DefaultToast from "./src/components/toasts/DefaultToast";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts";

export default function App() {
  YellowBox.ignoreWarnings([""]);

  return (
    <AuthProvider>
      <Routes />
      <DefaultToast />
    </AuthProvider>
  );
}
