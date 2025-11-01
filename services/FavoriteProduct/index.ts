import { getValidToken } from '@/lib/tokenUtils';

const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

// GET all favorite products
export const getAllFavoriteProducts = async () => {
  const token = await getValidToken();

  const res = await fetch(`${BASE_API}/favourite`, {
    headers: {
      Authorization: token || '',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch favorite products');
  return res.json();
};

//-------------- CREATE favorite product------------------------
export const createFavoriteProduct = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const token = await getValidToken();

  const res = await fetch(`${BASE_API}/favourite`, {
    method: 'POST',
    headers: {
      Authorization: token || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, productId }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to create favorite product');
  }

  return json;
};

//---------------- DELETE favorite product---------------------
export const deleteFavoriteProduct = async (favoriteProductId: string) => {
  const token = await getValidToken();

  const res = await fetch(`${BASE_API}/favourite/${favoriteProductId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token || '',
    },
  });

  if (!res.ok) throw new Error('Failed to delete favorite product');
  return res.json();
};
