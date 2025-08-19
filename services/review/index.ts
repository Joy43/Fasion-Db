import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
const API_URL =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// ----------GET CATEGORIES----------

export const getAllReview = async () => {
  const res = await fetch(`${API_URL}/review`);
  if (!res.ok) throw new Error("Failed to fetch review");
  return res.json();
};
//----------- create a category----------
export const useCreateReview = () => {
  return useMutation({
    mutationFn: async (reviewData: { review: string; rating: number; product: string }) => {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_API}/reviews`, 
        reviewData,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    },
  });
}
//------------ delete a category-------------
export const deleteReview = async ({
  reviewId,
  token,
}: {
  reviewId: string;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/review/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
};
// ---------------- update a category-----------------
export const updateReview = async ({
  reviewId,
  data,
  token,
}: {
  reviewId: string;
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/review/${reviewId}`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
};
