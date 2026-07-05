import { store } from '@/redux';
import { authAPI } from '@/redux/auth/auth.api';
import messaging, { getMessaging, getToken, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';

const getMessagingInstance = () => {
  return typeof getMessaging === 'function' ? getMessaging() : (messaging as any)();
};

/**
 * Request user permission to receive notifications
 */
export const requestUserPermission = async () => {
  const messagingInstance = getMessagingInstance();
  const authStatus = await (requestPermission ? requestPermission(messagingInstance) : messagingInstance.requestPermission());
  const enabled =
    authStatus === (AuthorizationStatus ? AuthorizationStatus.AUTHORIZED : (messaging as any).AuthorizationStatus.AUTHORIZED) ||
    authStatus === (AuthorizationStatus ? AuthorizationStatus.PROVISIONAL : (messaging as any).AuthorizationStatus.PROVISIONAL);

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

    const messagingInstance = getMessagingInstance();
    const token = await (getToken ? getToken(messagingInstance) : messagingInstance.getToken());
    console.log('📱 Device FCM Token:', token);

    // Register this FCM token to backend via Redux API only if logged in
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      await store.dispatch(authAPI.endpoints.registerFcmToken.initiate({ fcmToken: token }));
      console.log('✅ FCM token registered successfully with backend');
    } else {
      console.log('ℹ️ No logged-in user yet; skipping backend FCM token registration');
    }
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

import { secureStorage } from '@/utils/secureStorage';
import { DeviceEventEmitter } from 'react-native';

export interface SavedNotification {
  id: string;
  title: string;
  body: string;
  receivedAt: number;
  imageUrl?: string;
}

export const saveNotification = async (title: string, body: string, imageUrl?: string) => {
  try {
    const existing = await secureStorage.getItem('notifications');
    const list: SavedNotification[] = existing ? JSON.parse(existing) : [];
    const newNotification: SavedNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      body,
      receivedAt: Date.now(),
      imageUrl,
    };
    list.unshift(newNotification);
    await secureStorage.setItem('notifications', JSON.stringify(list.slice(0, 50)));
    DeviceEventEmitter.emit('NEW_NOTIFICATION', newNotification);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

export const getNotifications = async (): Promise<SavedNotification[]> => {
  try {
    const existing = await secureStorage.getItem('notifications');
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

export const clearAllNotifications = async () => {
  try {
    await secureStorage.removeItem('notifications');
    DeviceEventEmitter.emit('NOTIFICATIONS_CLEARED');
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
};
