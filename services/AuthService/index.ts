import AsyncStorage from '@react-native-async-storage/async-storage';
import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

// --- Configuration ---
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 

// --- Helper: Fetch with timeout ---
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

// --- Helper: Get retry delay with exponential backoff ---
const getRetryDelay = (attempt: number): number => {
  return Math.min(RETRY_DELAY * Math.pow(2, attempt), 30000);
};

// --- Check if token is expired ---
const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const expired = decoded.exp * 1000 < Date.now();
    console.log(`isTokenExpired: exp=${decoded.exp * 1000}, now=${Date.now()}, expired=${expired}`);
    return expired;
  } catch (err: any) {
    console.error('Token decode error:', err.message || err);
    return true;
  }
};

// --- Auto logout ---
export const autoLogout = async () => {
  console.log('autoLogout called - removing tokens');
  await AsyncStorage.multiRemove([
    'accessToken',
    'refreshToken',
    'userProfile',
  ]);
};

// --- Refresh access token ---
export const getNewToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('getNewToken failed: No refresh token found in AsyncStorage');
      await autoLogout();
      return { success: false, message: 'No refresh token found' };
    }

    const res = await fetchWithTimeout(
      `${BASE_API}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: refreshToken,
        },
      },
      20000 // 20 second timeout for auth operations
    );

    const result = await res.json();

    if (res.ok && result.success && result.data?.accessToken) {
      await AsyncStorage.setItem('accessToken', result.data.accessToken);
      return result;
    }

    await autoLogout();
    return {
      success: false,
      message: result.message || 'Failed to refresh token',
    };
  } catch (err: any) {
    await autoLogout();

    // Handle timeout errors specifically
    if (err.name === 'AbortError') {
      console.error('Token refresh timeout: Server did not respond in time');
      return {
        success: false,
        message: 'Server timeout - please check your connection',
      };
    }

    console.error('Token refresh error:', err.message);
    return { success: false, message: err.message || 'Unknown error' };
  }
};

// --- Get valid access token ---
const getValidToken = async (): Promise<string | null> => {
  let accessToken = await AsyncStorage.getItem('accessToken');
  console.log('getValidToken: retrieved raw token:', accessToken ? 'Exists' : 'Null');

  if (!accessToken || isTokenExpired(accessToken)) {
    console.log('getValidToken: token is null or expired, attempting refresh...');
    const refreshResult = await getNewToken();
    if (refreshResult.success && refreshResult.data?.accessToken) {
      accessToken = refreshResult.data.accessToken;
      console.log('getValidToken: successfully refreshed token');
    } else {
      console.log('getValidToken: refresh failed, returning null');
      return null;
    }
  }

  return accessToken;
};

// --- Reusable API request handler with timeout and retry ---
const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any,
  requireAuth: boolean = false,
  attempt: number = 0
) => {
  try {
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requireAuth) {
      const accessToken = await getValidToken();
      if (!accessToken) {
        await autoLogout();
        return { success: false, message: 'No valid access token found' };
      }
      headers['Authorization'] = accessToken;
    }

    let res = await fetchWithTimeout(
      `${BASE_API}${endpoint}`,
      {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      },
      REQUEST_TIMEOUT
    );

    let result = await res.json();

    // Retry once if 401 (token expired)
    if (!res.ok && res.status === 401 && requireAuth) {
      const refreshResult = await getNewToken();
      if (!refreshResult.success) {
        return { success: false, message: 'No valid access token found' };
      }

      const newAccessToken = await getValidToken();
      if (!newAccessToken)
        return { success: false, message: 'No valid access token found' };

      headers['Authorization'] = newAccessToken;
      res = await fetchWithTimeout(
        `${BASE_API}${endpoint}`,
        {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        },
        REQUEST_TIMEOUT
      );
      result = await res.json();
    }

    if (!res.ok) {
      console.error(`API Error [${res.status}]:`, result?.message || result);
      return { success: false, message: result?.message || 'Unknown error' };
    }

    return result;
  } catch (error: any) {
    // Handle timeout errors
    if (error.name === 'AbortError') {
      console.warn(
        `Request timeout on ${endpoint} (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      // Retry on timeout for GET requests or if attempts remaining
      if (
        (method === 'GET' || method === 'POST') &&
        attempt < MAX_RETRIES - 1
      ) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return apiRequest(endpoint, method, body, requireAuth, attempt + 1);
      }

      return {
        success: false,
        message:
          'Request timed out - server is not responding. Please check your connection.',
      };
    }

    // Handle network errors
    if (
      error instanceof TypeError &&
      error.message.includes('Failed to fetch')
    ) {
      console.error('Network error:', error.message);
      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return apiRequest(endpoint, method, body, requireAuth, attempt + 1);
      }
      return {
        success: false,
        message: 'Network error - please check your internet connection.',
      };
    }

    console.error('Unexpected error:', error.message);
    return { success: false, message: error.message || 'Unknown error' };
  }
};

// Helper to automatically retrieve FCM token
const getFcmToken = async (): Promise<string | undefined> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      console.log('🔑 FCM token retrieved:', token);
      return token;
    }
  } catch (error) {
    console.warn('Failed to retrieve FCM token:', error);
  }
  return undefined;
};

// --- Auth functions ---
export const registerUser = async (userData: FieldValues) => {
  const fcmToken = await getFcmToken();
  const payload = fcmToken ? { ...userData, fcmToken } : userData;
  const result = await apiRequest('/user', 'POST', payload);
  console.log('Register API result:', result);
  if (result.success && result.data) {
    const { accessToken, refreshToken } = result.data;
    if (accessToken) await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);
  }
  return result;
};

export const loginUser = async (userData: FieldValues) => {
  const fcmToken = await getFcmToken();
  const payload = fcmToken ? { ...userData, fcmToken } : userData;
  const result = await apiRequest('/auth/login', 'POST', payload);
  console.log('Login API result:', result);
  if (result.success && result.data) {
    await AsyncStorage.setItem('accessToken', result.data.accessToken);
    await AsyncStorage.setItem('refreshToken', result.data.refreshToken);
  }
  return result;
};

export const logout = autoLogout;

//  current user--==

export const getCurrentUser = async () => {
  try {
    const accessToken = await getValidToken();
    if (!accessToken) {
      await autoLogout();
      console.log('getCurrentUser failed: No valid access token found');
      return { success: false, message: 'No valid access token found' };
    }

    const cached = await AsyncStorage.getItem('userProfile');
    if (cached) {
      console.log('getCurrentUser returning cached profile:', cached);
      return { success: true, data: JSON.parse(cached) };
    }

    console.log('getCurrentUser fetching profile from server...');
    const result = await getUserProfile();
    console.log('getCurrentUser server response:', result);
    if (result.success && result.data) {
      await AsyncStorage.setItem('userProfile', JSON.stringify(result.data));
      return result;
    }

    return {
      success: false,
      message: result.message || 'Failed to fetch user',
    };
  } catch (err) {
    console.warn('Error fetching user:', err);
    return { success: false, message: 'Error fetching user' };
  }
};

export const getUserProfile = async () =>
  apiRequest('/user/me', 'GET', null, true);

export const updateUserProfile = async (profileData: FieldValues) => {
  const result = await apiRequest(
    '/user/update-profile',
    'PATCH',
    profileData,
    true
  );
  if (result.success && result.data) {
    await AsyncStorage.setItem('userProfile', JSON.stringify(result.data));
  }
  return result;
};

export default apiRequest;
