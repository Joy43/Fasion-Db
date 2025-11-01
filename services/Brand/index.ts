const API_URL =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

// ----------GET CATEGORIES----------

export const getAllBrand = async () => {
  const res = await fetch(`${API_URL}/brand`);
  if (!res.ok) throw new Error('Failed to fetch brand');
  return res.json();
};
//----------- create a category----------
export const createBrand = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/brand`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error('Failed to create brand');
  return res.json();
};

//------------ delete a category-------------
export const deleteBrand = async ({
  brandId,
  token,
}: {
  brandId: string;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/brand/${brandId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) throw new Error('Failed to delete brand');
  return res.json();
};
// ---------------- update a category-----------------
export const updateBrand = async ({
  brandId,
  data,
  token,
}: {
  brandId: string;
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/category/${brandId}`, {
    method: 'PATCH',
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error('Failed to update brand');
  return res.json();
};
