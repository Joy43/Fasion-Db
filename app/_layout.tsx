import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import './globals.css';
export default function RootLayout() {
  return (
     <>
  <Stack>
             <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(start)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar className="auto" />
      {/* Toast provider */}
      <Toast />
  </>
  )
 
}
