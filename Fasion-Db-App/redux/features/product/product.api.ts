import { baseAPI } from "../../api/base.api";

interface ProductQuery {
  page?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  categories?: string;
  brands?: string;
  ratings?: string;
  search?: string;
}

export const productAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all products with optional filters ----
    getAllProducts: builder.query<any, ProductQuery | void>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params) {
          const { page, limit, minPrice, maxPrice, categories, brands, ratings, search } = params as ProductQuery;
          if (page) searchParams.append("page", page);
          if (limit) searchParams.append("limit", limit);
          if (minPrice) searchParams.append("minPrice", minPrice);
          if (maxPrice) searchParams.append("maxPrice", maxPrice);
          if (categories) searchParams.append("categories", categories);
          if (brands) searchParams.append("brands", brands);
          if (ratings) searchParams.append("ratings", ratings);
          if (search) searchParams.append("search", search);
        }
        return `/product?${searchParams.toString()}`;
      },
      providesTags: ["product"],
    }),

    // ---- Get single product ----
    getSingleProduct: builder.query<any, string>({
      query: (productId) => `/product/${productId}`,
      providesTags: (_result, _error, id) => [{ type: "product", id }, "review"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productAPI;
