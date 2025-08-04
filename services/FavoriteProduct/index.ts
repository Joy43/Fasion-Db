const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";
export const getAllFavoriteProducts = async () => {
  const res = await fetch(`${BASE_API}/favourite`);
  if (!res.ok) throw new Error("Failed to fetch favorite products");
  return res.json();
};

export const createFavoriteProduct = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${BASE_API}/favourite`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error("Failed to create favorite product");
  return res.json();
};

export const deleteFavoriteProduct = async ({
  favoriteProductId,
  token,
}: {
  favoriteProductId: string;
  token: string;
}) => {
  const res = await fetch(`${BASE_API}/favourite/${favoriteProductId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) throw new Error("Failed to delete favorite product");
  return res.json();
};
