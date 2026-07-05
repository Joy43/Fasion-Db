import { baseAPI } from "../../api/base.api";
import { OrderPayload } from "@/types/order.type";

export const orderAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Get my orders ----
    getMyOrders: builder.query<any, void>({
      query: () => "/order/my-orders",
      providesTags: ["order"],
    }),

    // ---- Create / place an order ----
    createOrder: builder.mutation<any, OrderPayload>({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyOrdersQuery, useCreateOrderMutation } = orderAPI;
