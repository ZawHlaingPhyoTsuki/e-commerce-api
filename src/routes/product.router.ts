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

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  isLogin,
  isAdmin,
  validate(createProductSchema),
  createProduct
);
router.put(
  "/:id",
  isLogin,
  isAdmin,
  validate(updateProductSchema),
  updateProduct
);
router.delete("/:id", isLogin, isAdmin, deleteProduct);

export default router;
