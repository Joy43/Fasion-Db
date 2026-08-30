import { baseAPI } from "../../api/base.api";

export const categoryAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all categories ----
    getAllCategories: builder.query<any, void>({
      query: () => "/category",
      providesTags: ["category"],
    }),

    // ---- Create a category (admin) ----
    createCategory: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // ---- Update a category (admin) ----
    updateCategory: builder.mutation<any, { categoryId: string; data: FormData }>({
      query: ({ categoryId, data }) => ({
        url: `/category/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // ---- Delete a category (admin) ----
    deleteCategory: builder.mutation<any, string>({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPI;
