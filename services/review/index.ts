
const API_URL= process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// ----------GET CATEGORIES----------

export const getAllReview= async () => {
  const res = await fetch(`${API_URL}/review`);
  if (!res.ok) throw new Error("Failed to fetch review");
  return res.json();
};
//----------- create a category----------
export const createReview= async ({
  
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/review`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error("Failed to create review");
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
  if(!res.ok) throw new Error("Failed to delete review");
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
        body:data
       
    });
    
    if (!res.ok) throw new Error("Failed to update review");
    return res.json();
    }