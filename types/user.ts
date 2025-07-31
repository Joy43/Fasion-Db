export type IUser = {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
};
