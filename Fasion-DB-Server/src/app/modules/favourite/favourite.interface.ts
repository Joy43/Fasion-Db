import { Types } from "mongoose";

export interface IWishlist {
 user: Types.ObjectId;
 product: Types.ObjectId;
 
}