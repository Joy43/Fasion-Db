const BASE_API =
  process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:5000/api/v1';

export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append('minPrice', '0');
    params.append('maxPrice', query?.price.toString());
  }

  if (query?.category) {
    params.append('categories', query?.category.toString());
  }
  if (query?.brand) {
    params.append('brands', query?.brand.toString());
  }
  if (query?.rating) {
    params.append('ratings', query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${BASE_API}/product?limit=${limit}&page=${page}&${params.toString()}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(`${BASE_API}/product/${productId}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addProduct = async (
  productData: FormData,
  accessToken: string
): Promise<any> => {
  try {
    const res = await fetch(`${BASE_API}/product`, {
      method: 'POST',
      body: productData,
      headers: {
        Authorization: accessToken,
      },
    });
    return res.json();
  } catch (error: any) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (
  productData: FormData,
  productId: string,
  accessToken: string
): Promise<any> => {
  try {
    const res = await fetch(`${BASE_API}/product/${productId}`, {
      method: 'PATCH',
      body: productData,
      headers: {
        Authorization: accessToken,
      },
    });
    return res.json();
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw error;
  }
};
