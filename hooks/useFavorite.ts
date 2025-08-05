import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getAllFavoriteProducts,
} from "@/services/FavoriteProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

// ✅ Fetch all favorite products
export const useGetFavorite = () => {
  return useQuery({
    queryKey: ["FAVORITE_PRODUCTS"],
    queryFn: getAllFavoriteProducts,
    staleTime: 0,
  });
};

// ✅ Add product to favorites
export const useAddToFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      return createFavoriteProduct({ userId, productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FAVORITE"] });
      Toast.show({
        type: "success",
        text1: "Added to favorites!",
        position: "bottom",
        visibilityTime: 2000,
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to add favorite.",
        position: "bottom",
        visibilityTime: 2500,
      });
    },
  });
};

// ✅ Delete favorite product
export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favoriteProductId: string) => {
      return deleteFavoriteProduct(favoriteProductId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FAVORITE_PRODUCTS"] });
    },
  });
};
