import { getValidToken } from "@/lib/tokenUtils";
import {
  createReview,
  deleteReview,
  getAllReview,
  updateReview,
} from "./../services/review/index";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ----------- Get all reviews ----------------
export const useReviews = () => {
  return useQuery({
    queryKey: ["REVIEW"],
    queryFn: getAllReview,
    staleTime: 0,
  });
};

// ----------- Create a review ----------------
interface CreateReviewPayload {
  review: string;
  rating: number;
  product: string;
  isVerifiedPurchase: boolean;
}

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const token = await getValidToken();
      if (!token) throw new Error("Missing or expired token");

      // Send JSON directly instead of FormData
      return createReview({ data: payload, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["REVIEW"] });
    },
  });
};

// ----------- Delete a review ----------------
export const useDeleteReview = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview({ reviewId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["REVIEW"] }); // refetch reviews
    },
  });
};

// ----------- Update a review ----------------
export const useUpdateReview = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: FormData }) =>
      updateReview({ reviewId, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["REVIEW"] });
    },
  });
};
