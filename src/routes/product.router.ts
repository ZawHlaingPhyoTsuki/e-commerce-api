import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createProductSchema, updateProductSchema } from "../types/zod";

const router = express.Router();

// GET /api/products - Get all products (Public)
router.get("/", getAllProducts);

// GET /api/products/:id - Get a product by ID (Public)
router.get("/:id", getProductById);

// POST /api/products - Create a new product (Admin Only)
router.post(
  "/",
  isLogin,
  isAdmin,
  validate(createProductSchema),
  createProduct
);

// PUT /api/products/:id - Update a product by ID (Admin Only)
router.put(
  "/:id",
  isLogin,
  isAdmin,
  validate(updateProductSchema),
  updateProduct
);

// DELETE /api/products/:id - Delete a product by ID (Admin Only)
router.delete("/:id", isLogin, isAdmin, deleteProduct);

export default router;
