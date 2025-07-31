import { getValidToken } from "@/lib/verifyToken";

import { addOrder } from "@/services/Order";
import { OrderPayload } from "@/types/order.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ----------- Create an Order ----------------
export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderPayload) => {
      const token = await getValidToken();
      if (!token) throw new Error("Missing or expired token");
      return await addOrder(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ORDER"] });
    },
  });
};
