import mongoose, { Schema, Document } from "mongoose";
import { IWishlist } from "./favourite.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
  },
  {
    timestamps: true, 
  }
);

// Create the Wishlist model
const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;