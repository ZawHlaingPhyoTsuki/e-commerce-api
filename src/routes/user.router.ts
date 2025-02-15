import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { updateUserSchema } from "../types/zod";

const router = express.Router();

// GET /api/users- Get All Users (Admin only)
router.get("/", isLogin, isAdmin, getAllUsers);

// GET /api/users/:id - Get a user by ID (Admin only)
router.get("/:id", isLogin, getUserById);

// PUT /api/users/:id - Update a user by ID (Admin only)
router.put("/:id", isLogin, validate(updateUserSchema), updateUser);

// DELETE /api/users/:id - Delete a user by ID (Admin only)
router.delete("/:id", isLogin, isAdmin, deleteUser);

export default router;
