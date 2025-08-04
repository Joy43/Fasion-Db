import AsyncStorage from "@react-native-async-storage/async-storage";
import { FieldValues } from "react-hook-form";
import { getValidToken, getDecodedUser } from "@/lib/tokenUtils";

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// Reusable API request handler
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
      const token = await getValidToken();
      if (!token) {
        return { success: false, message: "No valid access token found" };
      }
      headers["Authorization"] = token;
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

// Register user
export const registerUser = async (userData: FieldValues) => {
  const result = await apiRequest("/user", "POST", userData);

  if (result.success && result.data) {
    const { accessToken, refreshToken } = result.data;
    if (accessToken) await AsyncStorage.setItem("accessToken", accessToken);
    if (refreshToken) await AsyncStorage.setItem("refreshToken", refreshToken);
    // Do not log result.data to avoid exposing sensitive info
  }

  return result;
};

// Login user
export const loginUser = async (userData: FieldValues) => {
  const result = await apiRequest("/auth/login", "POST", userData);
  if (result.success) {
    await AsyncStorage.setItem("accessToken", result.data.accessToken);
    await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
    // Do not log result.data
  }
  return result;
};

// Get current user (fetches fresh profile data)
export const getCurrentUser = async () => {
  try {
    // Check if user profile is cached
    const cachedProfile = await AsyncStorage.getItem("userProfile");
    if (cachedProfile) {
      return { success: true, data: JSON.parse(cachedProfile) };
    }

    // Fetch fresh profile from server
    const profileResult = await getUserProfile();
    if (profileResult.success && profileResult.data) {
      // Cache profile data
      await AsyncStorage.setItem(
        "userProfile",
        JSON.stringify(profileResult.data)
      );
      return profileResult;
    }

    return {
      success: false,
      message: profileResult.message || "Failed to fetch user",
    };
  } catch (error) {
    console.warn("Error getting user:", error);
    return { success: false, message: "Error fetching user" };
  }
};

// Logout
export const logout = async () => {
  await AsyncStorage.multiRemove([
    "accessToken",
    "refreshToken",
    "userProfile",
  ]);
};

// Get user profile
export const getUserProfile = async () => {
  const result = await apiRequest("/user/me", "GET", null, true);
  return result;
};

// Update user profile
export const updateUserProfile = async (profileData: FieldValues) => {
  const result = await apiRequest(
    "/user/update-profile",
    "PATCH",
    profileData,
    true
  );
  if (result.success && result.data) {
    // Update cached profile
    await AsyncStorage.setItem("userProfile", JSON.stringify(result.data));
  }
  return result;
};

// Get new refresh token
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
      return result;
    }

    return {
      success: false,
      message: result.message || "Failed to refresh token",
    };
  } catch (error: any) {
    console.error("Token refresh error:", error.message);
    return { success: false, message: error.message || "Unknown error" };
  }
};

export default apiRequest;
