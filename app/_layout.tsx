import { AuthProvider } from "../providers/AuthProvider";
import { Slot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function RootLayout() {
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <Slot />
    </AuthProvider>
  </GestureHandlerRootView >;
}