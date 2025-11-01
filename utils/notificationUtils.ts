import { registerFcmToken } from '@/services/notification';
import messaging from '@react-native-firebase/messaging';

/**
 * Request user permission to receive notifications
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

/**
 * Retrieve and register FCM token with backend
 */
export const setupFcmToken = async () => {
  try {
    const granted = await requestUserPermission();
    if (!granted) {
      console.log('🔒 Notification permission not granted');
      return;
    }

    const token = await messaging().getToken();
    console.log('📱 Device FCM Token:', token);

    // Register this FCM token to backend
    await registerFcmToken(token);

    console.log('✅ FCM token registered successfully with backend');
  } catch (err) {
    console.error('❌ Error in setupFcmToken:', err);
  }
};

/**
 * Listen for foreground messages
 */
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging().onMessage(async (remoteMessage) => {
      resolve(remoteMessage);
    });
  });
