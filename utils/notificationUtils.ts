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

import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const existing = await AsyncStorage.getItem('notifications');
    const list: SavedNotification[] = existing ? JSON.parse(existing) : [];
    const newNotification: SavedNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      body,
      receivedAt: Date.now(),
      imageUrl,
    };
    list.unshift(newNotification);
    await AsyncStorage.setItem('notifications', JSON.stringify(list.slice(0, 50)));
    DeviceEventEmitter.emit('NEW_NOTIFICATION', newNotification);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

export const getNotifications = async (): Promise<SavedNotification[]> => {
  try {
    const existing = await AsyncStorage.getItem('notifications');
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

export const clearAllNotifications = async () => {
  try {
    await AsyncStorage.removeItem('notifications');
    DeviceEventEmitter.emit('NOTIFICATIONS_CLEARED');
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
};
