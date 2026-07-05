import { baseAPI } from "../../api/base.api";
import { OrderPayload } from "@/types/order.type";

interface ApplyCouponPayload {
  couponCode: string;
  orderAmount: number;
  shopId: string;
}

export const cartAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Place cart order ----
    placeCartOrder: builder.mutation<any, OrderPayload>({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),

    // ---- Apply coupon to cart ----
    applyCoupon: builder.mutation<any, ApplyCouponPayload>({
      query: ({ couponCode, orderAmount, shopId }) => ({
        url: `/coupon/${couponCode}`,
        method: "POST",
        body: { orderAmount, shopId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePlaceCartOrderMutation, useApplyCouponMutation } = cartAPI;
