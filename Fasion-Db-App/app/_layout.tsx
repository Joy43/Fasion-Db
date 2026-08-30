import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

import './globals.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, View, Animated, StyleSheet } from 'react-native';
import Providers from '@/providers/Providers';
import { useEffect, useRef, useState } from 'react';
import messaging, { getMessaging, onMessage, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { setupFcmToken, saveNotification } from '@/utils/notificationUtils';
import * as Notifications from 'expo-notifications';
import LottieView from 'lottie-react-native';

const getMessagingInstance = () => {
  return typeof getMessaging === 'function' ? getMessaging() : (messaging as any)();
};

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
  const appColor = '#FFFFFF';
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnimationFinish = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
    });
  };

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

    // Foreground notification listener
    const messagingInstance = getMessagingInstance();
    const unsubscribe = onMessage ? onMessage(messagingInstance, async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
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
    }) : messagingInstance.onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
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
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: appColor,
            paddingTop: Platform.OS === 'android' ? 0 : 0,
          }}
        >
          {/* StatusBar from Expo handles both platforms perfectly */}
          <StatusBar style="dark" backgroundColor={appColor} animated />

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

        {showSplash && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999,
                opacity: fadeAnim,
              },
            ]}
          >
            <LottieView
              source={require('../assets/images/splash.json')}
              autoPlay
              loop={false}
              onAnimationFinish={handleAnimationFinish}
              style={{ width: 350, height: 350 }}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </View>
    </Providers>
  );
}
