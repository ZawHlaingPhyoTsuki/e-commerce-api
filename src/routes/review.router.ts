import express from "express";
import {
  getReviewsByProductId,
  createReview,
  deleteReview,
} from "../controllers/review.controller";
import { isLogin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createReviewSchema } from "../types/zod";

const router = express.Router();

router.get("/product/:productId", getReviewsByProductId);
router.post("/", isLogin, validate(createReviewSchema), createReview);
router.delete("/:id", isLogin, deleteReview);

export default router;
