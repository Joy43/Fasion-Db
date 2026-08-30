export interface OrderPayload {
  products: ProductOrder[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
}
export interface ProductOrder {
  product: string;
  color: string;
  quantity: number;
}
