import { getValidToken } from '@/lib/tokenUtils';

import { addOrder, getOrders } from '@/services/Order';
import { OrderPayload } from '@/types/order.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ----------- Create an Order ----------------
export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderPayload) => {
      const token = await getValidToken();
      if (!token) throw new Error('Missing or expired token');
      return await addOrder(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ORDER'] });
    },
    retry: 1, 
    retryDelay: 1000,
  });
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['ORDER'],
    queryFn: async () => {
      const token = await getValidToken();
      if (!token) throw new Error('Missing or expired token');
      return await getOrders(token);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};
