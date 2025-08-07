export type OrderResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Order[];
};

export type Order = {
  _id: string;
  user: {
    clientInfo: {
      device: string;
      browser: string;
      ipAddress: string;
      pcName: string;
      os: string;
      userAgent: string;
    };
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    hasShop: boolean;
    isActive: boolean;
    otpToken: string | null;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  products: ProductItem[];
  coupon: Coupon;
  discount: number;
  deliveryCharge: number;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled"; // adjust as needed
  shippingAddress: string;
  paymentMethod: "Online" | "COD" | string;
  paymentStatus: "Pending" | "Paid" | "Failed" | string;
  totalAmount: number;
  finalAmount: number;
  shop: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductItem = {
  product: Product;
  quantity: number;
  color: string;
  _id: string;
  unitPrice: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  category: string;
  imageUrls: string[];
  isActive: boolean;
  shop: string;
  brand: string;
  averageRating: number;
  ratingCount: number;
  availableColors: string[];
  specification: {
    material: string;
    sleeve: string;
    length: string;
    fit: string;
    ageGroup: string;
  };
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Coupon = {
  _id: string;
  code: string;
  shop: string;
  discountType: "Percentage" | "Flat";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
