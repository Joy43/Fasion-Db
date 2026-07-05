import { baseAPI } from "../../api/base.api";

interface CreateReviewPayload {
  review: string;
  rating: number;
  product: string;
  isVerifiedPurchase: boolean;
}

interface UpdateReviewPayload {
  reviewId: string;
  review?: string;
  rating?: number;
}

export const reviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get all reviews ----
    getAllReviews: builder.query<any, void>({
      query: () => "/review",
      providesTags: ["review"],
    }),

    // ---- Get reviews for a specific product ----
    getProductReviews: builder.query<any, string>({
      query: (productId) => `/review?product=${productId}`,
      providesTags: (_result, _error, productId) => [
        { type: "review", id: productId },
        "review",
      ],
    }),

    // ---- Create a review ----
    createReview: builder.mutation<any, CreateReviewPayload>({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    // ---- Update a review ----
    updateReview: builder.mutation<any, UpdateReviewPayload>({
      query: ({ reviewId, ...data }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    // ---- Delete a review ----
    deleteReview: builder.mutation<any, string>({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllReviewsQuery,
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewAPI;
