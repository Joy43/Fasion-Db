import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

import './globals.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, View } from 'react-native';
import Providers from '@/providers/Providers';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { setupFcmToken, saveNotification } from '@/utils/notificationUtils';
import * as Notifications from 'expo-notifications';

// Configure how notifications should be handled when received in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const appColor = '#10B981';

  useEffect(() => {
    // Configure default Android channel for peeking banners
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Register FCM Token
    setupFcmToken();

    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground Message received:', remoteMessage);
      
      // Trigger a native local notification banner immediately
      if (remoteMessage.notification) {
        const title = remoteMessage.notification.title || 'Notification';
        const body = remoteMessage.notification.body || '';
        const imageUrl = (remoteMessage.notification as any).imageUrl || 
                         remoteMessage.notification.android?.imageUrl || 
                         remoteMessage.data?.imageUrl;
        
        await saveNotification(title, body, imageUrl);

        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            data: remoteMessage.data,
          },
          trigger: null,
        });
      }
    });

    return unsubscribe;
  }, []);

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
            <Stack.Screen name="(cart)" options={{ headerShown: false }} />

            <Stack.Screen name="(settings)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <Toast />
        </View>
      </SafeAreaView>
    </Providers>
  );
}
