import { OrderPayload } from '@/types/order.type';
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

export const addOrder = async (
  orderData: OrderPayload,
  accessToken?: string,
  attempt: number = 0
): Promise<any> => {
  try {
    const token = accessToken || (await getValidToken());

    if (!token) {
      throw new Error('Missing or expired token - unable to create order');
    }

    const res = await fetchWithTimeout(
      `${BASE_API}/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(orderData),
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
    // Handle timeout errors with retry
    if (error.name === 'AbortError') {
      console.warn(
        `Order creation timeout (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying order creation after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return addOrder(orderData, accessToken, attempt + 1);
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
        return addOrder(orderData, accessToken, attempt + 1);
      }

      throw new Error(
        'Network error - please check your internet connection and try again.'
      );
    }

    console.error('Error creating order:', error.message);
    throw error;
  }
};

export const getOrders = async (
  accessToken?: string,
  attempt: number = 0
): Promise<any> => {
  try {
    const token = accessToken || (await getValidToken());

    if (!token) {
      throw new Error('Missing or expired token - unable to fetch orders');
    }

    const res = await fetchWithTimeout(
      `${BASE_API}/order/my-orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
      30000 // 30 seconds for read operations
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch orders (${res.status})`
      );
    }

    return await res.json();
  } catch (error: any) {
    // Handle timeout errors with retry
    if (error.name === 'AbortError') {
      console.warn(
        `Fetch orders timeout (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying orders fetch after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return getOrders(accessToken, attempt + 1);
      }

      throw new Error(
        'Orders fetch timed out - server is not responding. Please try again.'
      );
    }

    // Handle network errors with retry
    if (error instanceof TypeError) {
      console.error('Orders fetch network error:', error.message);

      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Retrying orders fetch after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return getOrders(accessToken, attempt + 1);
      }

      throw new Error(
        'Network error - please check your internet connection and try again.'
      );
    }

    console.error('Error fetching orders:', error.message);
    throw error;
  }
};
