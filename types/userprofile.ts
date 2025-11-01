export type IUserProfile = {
  name?: string;
  photo?: string;
  email?: string;
  role?: string;
  hasShop?: boolean;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  profile?: {
    gender?: string;
    phoneNo?: string;
    address?: string;
    dateOfBirth?: string;
    photo?: string;
  };
  clientInfo?: {
    device?: string;
    browser?: string;
    ipAddress?: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };
};
