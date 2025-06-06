const API_URL= process.env.EXPO_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

// ----------GET CATEGORIES----------

export const getAllCategories = async () => {
  const res = await fetch(`${API_URL}/category`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
//----------- create a category----------
export const createCategory = async ({
  
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
};

//------------ delete a category-------------
export const deleteCategory = async ({
  categoryId,
  token,
}: {
  categoryId: string;
  token: string;
}) => {
  const res = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  if(!res.ok) throw new Error("Failed to delete category");
  return res.json();
};
// ---------------- update a category-----------------
export const updateCategory = async ({
    categoryId,
    data,
    token,
    }: {
    categoryId: string;
    data: FormData;
    token: string;
    }) => {
    const res = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "PUT",
        headers: {
        Authorization: token,
        },
        body: data,
    });
    
    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
    }