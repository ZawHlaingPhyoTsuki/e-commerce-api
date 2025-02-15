import express from "express";
import {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller";
import { isLogin } from "../middlewares/auth.middleware";

const router = express.Router();

// GET /api/wishlists - Get All Wishlist Items by User (Logged-in user)
router.get("/", isLogin, getWishlistByUserId);

// POST /api/wishlists - Add a new wishlist item (Logged-in user)
router.post("/", isLogin, addToWishlist);

// DELETE /api/wishlists/:id - Remove a wishlist item (Logged-in user)
router.delete("/:id", isLogin, removeFromWishlist);

// DELETE /api/wishlists - Clear the wishlist (Logged-in user)
router.delete("/", isLogin, clearWishlist);

export default router;
