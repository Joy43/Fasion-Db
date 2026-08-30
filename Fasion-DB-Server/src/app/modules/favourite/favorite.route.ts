import express from "express";
import auth from "../../middleware/auth";

import { UserRole } from "../user/user.interface";
import { WishListController } from "./favorite.controller";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  WishListController.createWishlist
);
router.get("/", auth(UserRole.USER), WishListController.getWishlist);

router.get(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  WishListController.getAllWishlist
);
router.delete("/:id", WishListController.DeleteWishlist);
export const Favouriterouter = router;
