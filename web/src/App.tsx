import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import "./db/firebase";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
