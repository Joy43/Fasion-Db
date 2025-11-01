import { OrderPayload } from '@/types/order.type';

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';
// export interface ProductOrder {
//   product: string;
//   color: string;
//   quantity: number;
// }

// interface OrderPayload {
//   products: ProductOrder[];
//   coupon?: string;
//   shippingAddress: string;
//   paymentMethod: string;
// }

export const addOrder = async (
  orderData: OrderPayload,
  accessToken: string
): Promise<any> => {
  try {
    const res = await fetch(`${BASE_API}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }

    return await res.json();
  } catch (error: any) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async (accessToken: string) => {
  try {
    const res = await fetch(`${BASE_API}/order/my-orders`, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await res.json();
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
