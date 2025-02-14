import express from "express";
import {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";
import { isLogin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createWishlistSchema } from "../types/zod";

const router = express.Router();

router.get("/:userId", isLogin, getWishlistByUserId);
router.post("/", isLogin, validate(createWishlistSchema), addToWishlist);
router.delete("/:id", isLogin, removeFromWishlist);

export default router;
