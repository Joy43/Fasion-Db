import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { logout, setAccessToken } from "../auth/auth.slice";
import type { RootState } from "../store";

// Get the base URL with fallbacks
const apiUrl =
  process.env.EXPO_PUBLIC_BASE_API ||
  Constants.expoConfig?.extra?.BASE_API ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_BASE_API ||
  "https://fasiondb-server.vercel.app/api/v1";
console.log("API Base URL:", apiUrl);

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    if (headers.has("authorization")) {
      return headers;
    }
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("authorization", accessToken);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: { refreshToken },
            headers: {
              authorization: refreshToken,
            },
          },
          api,
          extraOptions
        );

        const data = refreshResult.data as { success: boolean; data?: { accessToken: string } } | undefined;

        if (data?.success && data?.data?.accessToken) {
          api.dispatch(setAccessToken(data.data.accessToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    // Auth & profile
    "user",
    "getProfile",
    "profile",
    // Feature tags
    "product",
    "category",
    "brand",
    "flashsell",
    "order",
    "favorite",
    "review",
    "cart",
  ],
  endpoints: () => ({}),
});