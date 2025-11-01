import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

import './globals.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, View } from 'react-native';
import Providers from '@/providers/Providers';

export default function RootLayout() {
  const appColor = '#10B981';

  return (
    <Providers>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: appColor,
          paddingTop: Platform.OS === 'android' ? 0 : 0,
        }}
        className="bg-white"
      >
        {/* StatusBar from Expo handles both platforms perfectly */}
        <StatusBar style="light" backgroundColor={appColor} animated />

        {/* Wrapper view ensures Android fills background below SafeArea */}
        <View style={{ flex: 1, backgroundColor: appColor }}>
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
        </View>
      </SafeAreaView>
    </Providers>
  );
}
