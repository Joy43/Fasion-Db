import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

export const registerFcmToken = async (fcmToken: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('registerFcmToken: No access token found');
      return { success: false, message: 'No access token found' };
    }

    const res = await fetch(`${BASE_API}/user/fcm-token`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ fcmToken }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error registering FCM token:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};
