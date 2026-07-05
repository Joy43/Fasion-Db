import { baseAPI } from "../api/base.api";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Login ----
    login: builder.mutation<
      {
        success: boolean;
        data: { accessToken: string; refreshToken: string };
        message?: string;
      },
      { email: string; password: string; fcmToken?: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ---- Register ----
    register: builder.mutation<
      {
        success: boolean;
        data: { accessToken: string; refreshToken: string };
        message?: string;
      },
      { name: string; email: string; password: string; fcmToken?: string }
    >({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: userData,
      }),
    }),

    // ---- Get current user profile ----
    getProfile: builder.query<{ success: boolean; data: any }, void>({
      query: () => "/user/me",
      providesTags: ["getProfile"],
    }),

    // ---- Update user profile ----
    updateProfile: builder.mutation<
      { success: boolean; data: any },
      Partial<{
        name: string;
        gender: string;
        phoneNo: string;
        address: string;
        dateOfBirth: string;
        photo: string;
      }>
    >({
      query: (profileData) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["getProfile"],
    }),

    // ---- Refresh token ----
    refreshToken: builder.mutation<
      { success: boolean; data: { accessToken: string } },
      { refreshToken: string }
    >({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
    }),

    // ---- Register FCM token ----
    registerFcmToken: builder.mutation<
      { success: boolean; message?: string },
      { fcmToken: string }
    >({
      query: (body) => ({
        url: "/user/fcm-token",
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
  useRegisterFcmTokenMutation,
} = authAPI;
