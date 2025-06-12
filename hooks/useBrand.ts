
import { createBrand, deleteBrand, getAllBrand, updateBrand } from "@/services/Brand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// -----------get al categories----------------
export const useBrands = () => {
  return useQuery({
    queryKey: ["BRAND"],
    queryFn: getAllBrand,
     staleTime: 0, 
  });
};
// -----------create, delete, update categories----------------

export const useCreateBrand = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createBrand({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BRAND"] });
    },
  });
};

export const useDeleteBrand = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: string) => deleteBrand({ brandId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CATEGORY"] });
    },
  });
};

export const useUpdateCategory = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: string; data: FormData }) =>
      updateBrand({ brandId, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BRAND"] });
    },
  });
};
