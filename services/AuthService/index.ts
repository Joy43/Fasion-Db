import AsyncStorage from "@react-native-async-storage/async-storage";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// --- Check if token is expired ---
const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.error("Token decode error:", err);
    return true;
  }
};

// --- Auto logout ---
export const autoLogout = async () => {
  await AsyncStorage.multiRemove([
    "accessToken",
    "refreshToken",
    "userProfile",
  ]);
};

// --- Refresh access token ---
export const getNewToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      await autoLogout();
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

    if (res.ok && result.success && result.data?.accessToken) {
      await AsyncStorage.setItem("accessToken", result.data.accessToken);
      return result;
    }

    await autoLogout();
    return {
      success: false,
      message: result.message || "Failed to refresh token",
    };
  } catch (err: any) {
    await autoLogout();
    console.error("Token refresh error:", err.message);
    return { success: false, message: err.message || "Unknown error" };
  }
};

// --- Get valid access token ---
const getValidToken = async (): Promise<string | null> => {
  let accessToken = await AsyncStorage.getItem("accessToken");

  if (!accessToken|| isTokenExpired(accessToken)) {
    const refreshResult = await getNewToken();
    if (refreshResult.success && refreshResult.data?.accessToken) {
      accessToken = refreshResult.data.accessToken;
    } else {
      return null;
    }
  }

  return accessToken;
};

// --- Reusable API request handler ---
const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  requireAuth: boolean = false
) => {
  try {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const accessToken = await getValidToken();
      if (!accessToken) {
        await autoLogout();
        return { success: false, message: "No valid access token found" };
      }
      headers["Authorization"] = accessToken;
    }

    let res = await fetch(`${BASE_API}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let result = await res.json();

    // Retry once if 401
    if (!res.ok && res.status === 401 && requireAuth) {
      const accessToken= await getValidToken();
      if (!accessToken)
        return { success: false, message: "No valid access token found" };

      headers["Authorization"] = accessToken;
      res = await fetch(`${BASE_API}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      result = await res.json();
    }

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

// --- Auth functions ---
export const registerUser = async (userData: FieldValues) => {
  const result = await apiRequest("/user", "POST", userData);
  if (result.success && result.data) {
    const { accessToken, refreshToken } = result.data;
    if (accessToken) await AsyncStorage.setItem("accessToken", accessToken);
    if (refreshToken) await AsyncStorage.setItem("refreshToken", refreshToken);
  }
  return result;
};

export const loginUser = async (userData: FieldValues) => {
  const result = await apiRequest("/auth/login", "POST", userData);
  if (result.success && result.data) {
    await AsyncStorage.setItem("accessToken", result.data.accessToken);
    await AsyncStorage.setItem("refreshToken", result.data.refreshToken);
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
      return { success: false, message: "No valid access token found" };
    }

    const cached = await AsyncStorage.getItem("userProfile");
    if (cached) return { success: true, data: JSON.parse(cached) };

    const result = await getUserProfile();
    if (result.success && result.data) {
      await AsyncStorage.setItem("userProfile", JSON.stringify(result.data));
      return result;
    }

    return {
      success: false,
      message: result.message || "Failed to fetch user",
    };
  } catch (err) {
    console.warn("Error fetching user:", err);
    return { success: false, message: "Error fetching user" };
  }
};

export const getUserProfile = async () =>
  apiRequest("/user/me", "GET", null, true);

export const updateUserProfile = async (profileData: FieldValues) => {
  const result = await apiRequest(
    "/user/update-profile",
    "PATCH",
    profileData,
    true
  );
  if (result.success && result.data) {
    await AsyncStorage.setItem("userProfile", JSON.stringify(result.data));
  }
  return result;
};

export default apiRequest;
