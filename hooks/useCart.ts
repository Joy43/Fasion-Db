// services/Cart.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API = process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// ---- Create Order ----
export const createOrder = async (order: any) => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  const res = await fetch(`${BASE_API}/order`, {
    method: "POST",
    headers: {
      Authorization: accessToken || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) throw new Error("Failed to create order");
  return await res.json();
};

// ---- Apply Coupon ----
export const applyCoupon = async ({
  couponCode,
  subTotal,
  shopId,
}: {
  couponCode: string;
  subTotal: number;
  shopId: string;
}) => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  const res = await fetch(`${BASE_API}/coupon/${couponCode}`, {
    method: "POST",
    headers: {
      Authorization: accessToken || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderAmount: subTotal, shopId }),
  });

  if (!res.ok) throw new Error("Failed to apply coupon");
  return await res.json();
};
