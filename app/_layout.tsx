import { Stack } from "expo-router";

import Toast from "react-native-toast-message";

import Providers from "@/providers/Providers";
import "./globals.css";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView } from "react-native";
export default function RootLayout() {
  return (
    <Providers>
      <>
       <SafeAreaView style={{ flex: 1, backgroundColor: "#7A1CAC" }}>
          <StatusBar
            style="light"
            backgroundColor={Platform.OS === "android" ? "#7A1CAC" : undefined}
            animated
          />
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
          <Stack.Screen name="(order)" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>

        <Toast />
         </SafeAreaView>
      </>
    </Providers>
  );
}
