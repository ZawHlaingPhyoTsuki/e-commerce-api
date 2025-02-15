import express from "express";
import { isLogin } from "../middlewares/auth.middleware";
import {
  addToCart,
  clearCart,
  getCartByUserId,
  removeCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller";

const router = express.Router();

// GET /api/carts - Get all cart items by user ID (Logged-in user)
router.get("/", isLogin, getCartByUserId);

// POST /api/carts - Add a new item to cart  (Logged-in user)
router.post("/", isLogin, addToCart);

// PUT /api/carts/:id - Update a cart item (Logged-in user)
router.put("/:id", isLogin, updateCartItemQuantity);

// DELETE /api/carts/:id - Remove a cart item (Logged-in user)
router.delete("/:id", isLogin, removeCart);

// DELETE /api/carts - Clear the cart (Logged-in user)
router.delete("/", isLogin, clearCart);

export default router;
