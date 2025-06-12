import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "@/services/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// -------- Get All Products --------
export const useProducts = (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  return useQuery({
    queryKey: ["PRODUCTS", { page, limit, ...query }],
    queryFn: () => getAllProducts(page, limit, query),
    staleTime: 0,
  });
};

// -------- Get Single Product --------
export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["PRODUCT", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
    staleTime: 0,
  });
};

// -------- Add Product --------
export const useAddProduct = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: FormData) => addProduct(productData, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
    },
  });
};

// -------- Update Product --------
export const useUpdateProduct = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      productData,
    }: {
      productId: string;
      productData: FormData;
    }) => updateProduct(productData, productId, accessToken),

    onSuccess: (_data, variables) => {
      // Invalidate product list and specific product cache
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      queryClient.invalidateQueries({ queryKey: ["PRODUCT", variables.productId] });
    },
  });
};
// -------- Delete Product --------
export const useDeleteProduct = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
      }).then((res) => res.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
    },
  });
}