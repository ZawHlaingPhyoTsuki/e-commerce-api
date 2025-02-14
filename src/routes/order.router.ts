import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createOrderSchema } from "../types/zod";

const router = express.Router();

router.get("/", isLogin, isAdmin, getAllOrders);
router.get("/:id", isLogin, getOrderById);
router.post("/", isLogin, validate(createOrderSchema), createOrder);
router.put("/:id/status", isLogin, isAdmin, updateOrderStatus);
router.delete("/:id", isLogin, isAdmin, deleteOrder);

export default router;
