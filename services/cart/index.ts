import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API = process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// Create Order
export const createOrder = async (order: any) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const res = await fetch(`${BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: accessToken || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// ------------------- Add Coupon ---------------------
export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const res = await fetch(`${BASE_API}/coupon/${couponCode}`, {
      method: "POST",
      headers: {
        Authorization: accessToken || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderAmount: subTotal, shopId }),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error applying coupon:", error);
    throw error;
  }
};
