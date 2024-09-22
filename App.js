import "react-native-gesture-handler";
import React from "react";
import { AppProvider, useAuth } from "./appContext";
import Routes from './Routes'

export default function App() {
  return (
    <AppProvider>
      <Routes></Routes>
    </AppProvider>
  );
}
