import { isTokenExpired } from "@/lib/verifyToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";

// Automatically use correct IP for Android Emulator
const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || "http://192.168.56.1:5000/api/v1";
   // Fallback to emulator localhost

// --- Reusable API request handler ---
const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  requireAuth: boolean = false
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        headers["Authorization"] = token; 
      } else {
        return { success: false, message: "No access token found" };
      }
    }

    const res = await fetch(`${BASE_API}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(`API Error [${res.status}]:`, result?.message || result);
      return { success: false, message: result?.message || "Unknown error" };
    }

    return result;
  } catch (error: any) {
    console.error("Network/API Error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};

export default apiRequest;

// --- Register user ---
export const registerUser = async (userData: FieldValues) => {
  const result = await apiRequest("/user", "POST", userData);
  if (result.success) {
    await AsyncStorage.setItem("accessToken", result.data.accessToken);
    await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
  }
  return result;
};

// --- Login user ---
export const loginUser = async (userData: FieldValues) => {
  const result = await apiRequest("/auth/login", "POST", userData);
  if (result.success) {
    await AsyncStorage.setItem("accessToken", result.data.accessToken);
    await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
  }
  return result;
};

// --- Get current user from token ---
export const getCurrentUser = async () => {
  try {
    let token = await AsyncStorage.getItem('accessToken');

    if (!token || await isTokenExpired(token)) {
      // Try to get a new token
      const response = await getNewToken();
      token = response?.data?.accessToken;

      if (token) {
        await AsyncStorage.setItem('accessToken', token);
      } else {
        return null;
      }
    }

    // Decode and return user info
    return jwtDecode(token);
  } catch (error) {
    console.warn('Error getting user:', error);
    return null;
  }
};
// --- Logout ---
export const logout = async () => {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
};
// ----- Get user profile -----
export const getUserProfile = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (!accessToken) return { success: false, message: "No access token found" };

  try {
    const res = await fetch(`${BASE_API}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message || "Failed to fetch profile" };
  } catch (error: any) {
    console.error("Profile fetch error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};


// --- Update user profile ---
export const updateUserProfile = async (profileData: FieldValues) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (!accessToken) return { success: false, message: "No access token found" };

  try {
    const res = await fetch(`${BASE_API}/user/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken, 
      },
      body: JSON.stringify(profileData),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message || "Failed to update profile" };
  } catch (error: any) {
    console.error("Profile update error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};


// -------------update my profile-----------------

export const getNewToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      return { success: false, message: "No refresh token found" };
    }

    const res = await fetch(`${BASE_API}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: refreshToken, 
      },
    });

    const result = await res.json();

    if (res.ok && result.success) {
      await AsyncStorage.setItem("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    console.error("Token refresh error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};