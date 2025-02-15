import express from "express";
import {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller";
import { isLogin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createWishlistSchema } from "../types/zod";

const router = express.Router();

router.get("/", isLogin, getWishlistByUserId);
router.post("/", isLogin, addToWishlist);
router.delete("/:id", isLogin, removeFromWishlist);
router.delete("/", isLogin, clearWishlist);

export default router;
