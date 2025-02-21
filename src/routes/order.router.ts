import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/orders - Create a new order (logged-in user)
router.post("/", isLogin, createOrder);

// GET /api/orders/user - Get orders by the logged-in user
router.get("/user", isLogin, getOrdersByUserId);

// GET /api/orders/:id - Get order by ID (logged-in user or admin)
router.get("/:id", isLogin, getOrderById);

// GET /api/orders - Get all orders (admin only)
router.get("/", isLogin, isAdmin, getAllOrders);

// PUT /api/orders/:id - Update order status (admin only)
router.put("/:id", isLogin, isAdmin, updateOrderStatus);

// DELETE /api/orders/:id - Delete an order (admin only)
router.delete("/:id", isLogin, isAdmin, deleteOrder);

export default router;

// REMAINDER
// If you define /:id before /user, then /user will never be matched because /:id will catch it first.
// Also if you try to delete the Order model that has one to many relationship with the OrderItem model, you will get an error.
// So you need to delete the OrderItem model first.