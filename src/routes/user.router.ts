import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

// GET /api/users- Get All Users (Admin only)
router.get("/", isLogin, isAdmin, getAllUsers);

// GET /api/users/:id - Get a user by ID (Admin only)
router.get("/:id", isLogin, isAdmin, getUserById);

// POST /api/users - Create a new user (Admin only)
router.post("/", isLogin, isAdmin, createUser);

// PUT /api/users/:id - Update a user by ID (Admin only)
router.put("/:id", isLogin, isAdmin, updateUser);

// DELETE /api/users/:id - Delete a user by ID (Admin only)
router.delete("/:id", isLogin, isAdmin, deleteUser);

export default router;
