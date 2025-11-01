import { FlashsellProducts } from '@/services/Flashsell';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// ---------get flashsell products hook----------------
export const useGetFlashsellProducts = () => {
  return useQuery({
    queryKey: ['FLASHSELL'],
    queryFn: FlashsellProducts,
    staleTime: 0,
  });
};
// ---------create flashsell product hook----------------
export const useCreateFlashsellProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: any) => {
      const res = await fetch('/api/flash-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error('Failed to create flashsell product');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashsellProducts'] });
    },
  });
};
