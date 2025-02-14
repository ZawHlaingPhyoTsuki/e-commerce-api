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

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post(
  "/",
  isLogin,
  isAdmin,
  validate(createCategorySchema),
  createCategory
);
router.put(
  "/:id",
  isLogin,
  isAdmin,
  validate(updateCategorySchema),
  updateCategory
);
router.delete("/:id", isLogin, isAdmin, deleteCategory);

export default router;
