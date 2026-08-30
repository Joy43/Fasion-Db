import { baseAPI } from "../../api/base.api";

export const brandAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all brands ----
    getAllBrands: builder.query<any, void>({
      query: () => "/brand",
      providesTags: ["brand"],
    }),

    // ---- Create a brand (admin) ----
    createBrand: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    // ---- Update a brand (admin) ----
    updateBrand: builder.mutation<any, { brandId: string; data: FormData }>({
      query: ({ brandId, data }) => ({
        url: `/brand/${brandId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    // ---- Delete a brand (admin) ----
    deleteBrand: builder.mutation<any, string>({
      query: (brandId) => ({
        url: `/brand/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandAPI;
