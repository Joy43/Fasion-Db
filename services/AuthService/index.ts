
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://172.19.160.1:5000/api/v1';

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });


    const result = await res.json();

    if (result.success) {
      await AsyncStorage.setItem("accessToken", result.data.accessToken);
      await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
    }

    return result;
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};
// -------------login user-------------
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Payload:", userData);
    console.log("Fetching:", `${BASE_API}/auth/login`);
    console.log("Response Status:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Error Data:", errorData);
      return { success: false, message: errorData.message };
    }

    const result = await res.json();
    console.log("Login API Response:", result);

    if (result.success) {
      await AsyncStorage.setItem("accessToken", result.data.accessToken);
      await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
    }

    return result;
  } catch (error: any) {
    console.error("Login Error:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
};

export const getCurrentUser = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    return decoded;
  }

  return null;
};



export const logout = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};

export const getNewToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const res = await fetch(`${BASE_API}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: refreshToken || "",
      },
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
