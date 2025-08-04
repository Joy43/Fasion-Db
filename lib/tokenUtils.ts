import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getNewToken } from "@/services/AuthService";

// Check if token is expired
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.error("Token decode error:", err);
    return true;
  }
};

// Get a valid access token, refreshing if necessary
export const getValidToken = async (): Promise<string | null> => {
  let token = await AsyncStorage.getItem("accessToken");

  if (!token || (await isTokenExpired(token))) {
    try {
      const { success, data, message } = await getNewToken();
      if (success && data?.accessToken) {
        token = data.accessToken;
        await AsyncStorage.setItem("accessToken", token as string);
      } else {
        console.warn("Token refresh failed:", message);
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  }

  return token;
};

// Get decoded user info from a valid token
export const getDecodedUser = async (): Promise<any | null> => {
  const token = await getValidToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};
