import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthState } from './authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: AuthState }).auth.token;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Category', 'Brand', 'Shop', 'Product', 'FlashSale'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user',
        method: 'POST',
        body: userData,
      }),
    }),

    // Categories
    getCategories: builder.query<any, void>({
      query: () => '/category',
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // Brands
    getBrands: builder.query<any, void>({
      query: () => '/brand',
      providesTags: ['Brand'],
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        url: '/brand',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Brand'],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/brand/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),

    // Shops
    getShops: builder.query<any, void>({
      query: () => '/shop',
      providesTags: ['Shop'],
    }),
    createShop: builder.mutation({
      query: (body) => ({
        url: '/shop',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Shop'],
    }),
    updateShop: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/shop/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Shop'],
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shop/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shop'],
    }),

    // Products
    getProducts: builder.query<any, void>({
      query: () => '/product',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/product',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Flash Sale
    getFlashSales: builder.query<any, void>({
      query: () => '/flash-sale',
      providesTags: ['FlashSale'],
    }),
    createFlashSale: builder.mutation({
      query: (body) => ({
        url: '/flash-sale',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FlashSale'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetShopsQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFlashSalesQuery,
  useCreateFlashSaleMutation,
} = apiSlice;
