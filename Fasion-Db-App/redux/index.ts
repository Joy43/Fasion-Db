/**
 * Central export point for all RTK Query hooks and Redux utilities.
 * Import all API hooks from this file in your components.
 *
 * Usage:
 *   import { useGetAllProductsQuery, useLoginMutation } from '@/redux';
 */

// Store
export { store, persistor } from "./store";
export type { RootState, AppDispatch } from "./store";

// Typed hooks
export { useAppDispatch, useAppSelector } from "./hook";

// Auth slice actions
export { setCredentials, setAccessToken, logout } from "./auth/auth.slice";

// Auth API hooks
export {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
  useRegisterFcmTokenMutation,
} from "./auth/auth.api";

// Product API hooks
export {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "./features/product/product.api";

// Category API hooks
export {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "./features/category/category.api";

// Brand API hooks
export {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from "./features/brand/brand.api";

// Flash Sale API hooks
export {
  useGetFlashsellQuery,
  useCreateFlashsellMutation,
} from "./features/flashsell/flashsell.api";

// Order API hooks
export {
  useGetMyOrdersQuery,
  useCreateOrderMutation,
} from "./features/order/order.api";

// Favorite API hooks
export {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "./features/favorite/favorite.api";

// Review API hooks
export {
  useGetAllReviewsQuery,
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "./features/review/review.api";

// Cart API hooks
export {
  usePlaceCartOrderMutation,
  useApplyCouponMutation,
} from "./features/cart/cart.api";

// Notification socket hook
export { useNotificationSocket } from "./features/notifications/notification.socket";
