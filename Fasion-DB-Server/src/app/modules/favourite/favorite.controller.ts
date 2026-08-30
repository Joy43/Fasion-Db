import { NextFunction, Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { WishListService } from "./favorurite.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const authUser = req.user as JwtPayload; 
  const result = await WishListService.CreateWishlist(req.body, authUser);
  res.status(200).json(result);
});

// -------------get wishlist
 const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const authUser = req.user as JwtPayload;
  const result = await WishListService.GetWishlistByUser(authUser);
  sendResponse(res,{
    success:true,
    message:"get wishlist is sucess-fully user wise",
    statusCode:StatusCodes.OK,
    data:result
  })
});


const getAllWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.GetAllWishlists();
  sendResponse(res, {
    success: true,
    message: "All wishlists retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// ---------delete-----------
const DeleteWishlist = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await WishListService.DeleteWishlist(id, req.user as JwtPayload);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const WishListController={
createWishlist,
getWishlist,
getAllWishlist,
DeleteWishlist
}