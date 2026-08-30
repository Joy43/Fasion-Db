export interface FavoriteProductResponse {
  success: boolean;
  message: string;
  data: FavoriteProductItem[];
}

export interface FavoriteProductItem {
  _id: string;
  user: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
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
  specification: Specification;
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Specification {
  material: string;
  sleeve: string;
  length: string;
  fit: string;
  ageGroup: string;
}
