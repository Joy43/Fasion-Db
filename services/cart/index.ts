import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValidToken } from '@/lib/tokenUtils';

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

// --- Configuration ---
const REQUEST_TIMEOUT = 40000; // 40 seconds for write operations
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

// --- Helper: Get retry delay with exponential backoff ---
const getRetryDelay = (attempt: number): number => {
  return Math.min(RETRY_DELAY * Math.pow(2, attempt), 30000);
};

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

// Create Order
export const createOrder = async (
  order: any,
  attempt: number = 0
): Promise<any> => {
  try {
    const accessToken = await getValidToken();

    if (!accessToken) {
      throw new Error('Missing or expired token - unable to create order');
    }

    const res = await fetchWithTimeout(
      `${BASE_API}/order`,
      {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      },
      REQUEST_TIMEOUT
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create order (${res.status})`
      );
    }

    return await res.json();
  } catch (error: any) {
    // Handle timeout with retry
    if (error.name === 'AbortError') {
      console.warn(
        `Cart order creation timeout (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying order creation after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return createOrder(order, attempt + 1);
      }

      throw new Error(
        'Order creation timed out - server is not responding. Please try again.'
      );
    }

    // Handle network errors with retry
    if (error instanceof TypeError) {
      console.error('Order creation network error:', error.message);

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying order creation after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return createOrder(order, attempt + 1);
      }

      throw new Error(
        'Network error - please check your internet connection and try again.'
      );
    }

    console.error('Error creating order:', error.message);
    throw error;
  }
};

// ------------------- Add Coupon ---------------------
export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string,
  attempt: number = 0
): Promise<any> => {
  try {
    const accessToken = await getValidToken();

    if (!accessToken) {
      throw new Error('Missing or expired token - unable to apply coupon');
    }

    const res = await fetchWithTimeout(
      `${BASE_API}/coupon/${couponCode}`,
      {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      },
      REQUEST_TIMEOUT
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to apply coupon (${res.status})`
      );
    }

    return await res.json();
  } catch (error: any) {
    // Handle timeout with retry
    if (error.name === 'AbortError') {
      console.warn(
        `Coupon application timeout (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying coupon application after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return addCoupon(couponCode, subTotal, shopId, attempt + 1);
      }

      throw new Error(
        'Coupon application timed out - server is not responding. Please try again.'
      );
    }

    // Handle network errors with retry
    if (error instanceof TypeError) {
      console.error('Coupon application network error:', error.message);

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying coupon application after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return addCoupon(couponCode, subTotal, shopId, attempt + 1);
      }

      throw new Error(
        'Network error - please check your internet connection and try again.'
      );
    }

    console.error('Error applying coupon:', error.message);
    throw error;
  }
};
// ------------ get coupon ----------
