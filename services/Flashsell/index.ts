const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

// ---------------- GET flashsell products ----------------
export const FlashsellProducts = async () => {
  try {
    const res = await fetch(`${BASE_API}/flash-sale`);
    if (!res.ok) {
      throw new Error(`Failed to fetch flashsell products: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching flashsell products:', error);
    throw error;
  }
};

// ---------------- CREATE flashsell product ----------------
export const createFlashsellProduct = async (
  productData: any,
  accessToken: string
) => {
  try {
    const res = await fetch(`${BASE_API}/flash-sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData?.message || 'Failed to create flashsell product';
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating flashsell product:', error);
    throw error;
  }
};
