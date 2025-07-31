import { getNewToken } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

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

export const getValidToken = async (): Promise<string | null> => {
  let token = await AsyncStorage.getItem("accessToken");

  if (!token || (await isTokenExpired(token))) {
    try {
      const { data } = await getNewToken();
      token = data?.accessToken;

      if (token) {
        await AsyncStorage.setItem("accessToken", token);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  }

  return token;
};
