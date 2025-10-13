import axios from "axios";
const API_URL =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// ----------GET REVIEWS----------
export const getAllReview = async () => {
  const res = await fetch(`${API_URL}/review`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

// ----------CREATE REVIEW----------
export const createReview = async ({
  data,
  token,
}: {
  data: {
    review: string;
    rating: number;
    product: string;
    isVerifiedPurchase: boolean;
  };
  token: string;
}) => {
  const res = await fetch(`${API_URL}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create review: ${errorText}`);
  }

  return res.json();
};

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
