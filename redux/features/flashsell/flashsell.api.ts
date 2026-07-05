import { baseAPI } from "../../api/base.api";

export const flashsellAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all flash sale products ----
    getFlashsell: builder.query<any, void>({
      query: () => "/flash-sale",
      providesTags: ["flashsell"],
    }),

    // ---- Create flash sale product (admin) ----
    createFlashsell: builder.mutation<
      any,
      { products: string[]; discountPercentage: number }
    >({
      query: (data) => ({
        url: "/flash-sale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["flashsell"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFlashsellQuery, useCreateFlashsellMutation } = flashsellAPI;
