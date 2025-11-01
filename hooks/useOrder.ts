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
  });
};
