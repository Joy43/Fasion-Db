import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

import Providers from "@/providers/Providers";
import "./globals.css";

export default function RootLayout() {
  return (
    <Providers>
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(start)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(register)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(productdetials)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(product)" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar className="auto" />
        <Toast />
      </>
    </Providers>
  );
}
