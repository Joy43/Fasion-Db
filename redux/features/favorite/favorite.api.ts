import { baseAPI } from "../../api/base.api";

export const favoriteAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all favorite products for current user ----
    getFavorites: builder.query<any, void>({
      query: () => "/favourite",
      providesTags: ["favorite"],
    }),

    // ---- Add a product to favorites ----
    addFavorite: builder.mutation<any, { userId: string; productId: string }>({
      query: (data) => ({
        url: "/favourite",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["favorite"],
    }),

    // ---- Remove a product from favorites ----
    deleteFavorite: builder.mutation<any, string>({
      query: (favoriteProductId) => ({
        url: `/favourite/${favoriteProductId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["favorite"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoriteAPI;
