import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createCategorySchema, updateCategorySchema } from "../types/zod";

const router = express.Router();

// GET /api/categories - Get all categories (Public)
router.get("/", getAllCategories);

// GET /api/categories/:id - Get a category by ID (Public)
router.get("/:id", getCategoryById);

// POST /api/categories - Create a new category (Admin Only)
router.post(
  "/",
  isLogin,
  isAdmin,
  validate(createCategorySchema),
  createCategory
);

// PUT /api/categories/:id - Update a category by ID (Admin Only)
router.put(
  "/:id",
  isLogin,
  isAdmin,
  validate(updateCategorySchema),
  updateCategory
);

// DELETE /api/categories/:id - Delete a category by ID (Admin Only)
router.delete("/:id", isLogin, isAdmin, deleteCategory);

export default router;
