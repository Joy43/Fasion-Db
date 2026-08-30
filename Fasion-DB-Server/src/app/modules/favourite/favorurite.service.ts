
import User from "../user/user.model";

import { StatusCodes } from "http-status-codes";

import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import Wishlist from './favourite.model';
import { sendMessageToToken } from "../../utils/fcmService";



const CreateWishlist = async (
  payload: { userId?: string; productId: string },
  authUser: JwtPayload
) => {
  const userId = payload.userId || authUser.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid user ID is required.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found.");
  }

  const productId = payload.productId;
  console.log("Debug Product ID:", payload.productId);
console.log("Full Payload:", payload);


  if (!productId || !mongoose.Types.ObjectId.isValid(String(productId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid product ID is required");
  }

  const alreadyExists = await Wishlist.findOne({
    user: user._id,
    product: productId,
  });

  if (alreadyExists) {
    return {
      success: false,
      message: "This product is already in your wishlist",
    };
  }

  const newWishlist = await Wishlist.create({
    user: user._id,
    product: productId,
  });

  const populatedWishlist = await Wishlist.findById(newWishlist._id)
    .populate("user")
    .populate("product");

    if (user.fcmToken) {
    try {
      await sendMessageToToken(user.fcmToken, {
        title: "Wishlist Updated 💖",
        body: `You added "${populatedWishlist?.product?.id}" to your wishlist.`,
        data: { productId: String(productId) },
      });
    } catch (err) {
      console.error("Error sending FCM notification:", err);
    }
  } else {
    console.warn(`⚠️ User ${user.email} has no FCM token`);
  }

  return {
    success: true,
    message: "product added to wishlist",
    wishlist: populatedWishlist,
  };
};

// ---------------get wishlist--------------
const GetWishlistByUser = async (authUser: JwtPayload) => {
  const userId = authUser?.userId || authUser?.user;

  console.log("Debug: Extracted userId =", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid user ID is required.");
  }

  const user = await User.findById(String(userId));
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const wishlistResult = await Wishlist.find({ user: user._id }).populate("product");

  return wishlistResult;
};

const GetAllWishlists = async () => {
  const allWishlists = await Wishlist.find({})
    .populate("user")
    .populate("product");

  return allWishlists;
};

const DeleteWishlist = async (wishlistId: string, authUser: JwtPayload) => {
  if (!wishlistId || !mongoose.Types.ObjectId.isValid(wishlistId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid wishlist ID is required.");
  }

  const wishlist = await Wishlist.findById(wishlistId);

  if (!wishlist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wishlist item not found.");
  }

  //------------ Ensure user is authorized to delete------------------
  const userId = authUser?.userId || authUser?.user;
  if (String(wishlist.user) !== String(userId)) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to delete this wishlist.");
  }

  await Wishlist.findByIdAndDelete(wishlistId);

  return {
    success: true,
    message: "Wishlist item deleted successfully",
  };
};


export const WishListService = {
  CreateWishlist,
  GetWishlistByUser,
  GetAllWishlists,
  DeleteWishlist
};