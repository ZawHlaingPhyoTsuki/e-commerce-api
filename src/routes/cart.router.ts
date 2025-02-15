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

router.get("/", isLogin, getCartByUserId);
router.post("/", isLogin, addToCart);
router.put("/:id", isLogin, updateCartItemQuantity);
router.delete("/:id", isLogin, removeCart);
router.delete("/", isLogin, clearCart);

export default router;
