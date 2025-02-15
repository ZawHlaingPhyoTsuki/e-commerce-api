import { Router } from "express";
import {
  getReviewsByProductId,
  getReviewsByUserId,
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controller";
import { isAdmin, isLogin } from "../middlewares/auth.middleware";


const router = Router();

// GET /api/reviews/product/:productId - Get reviews for a product (public)
router.get("/products/:productId", getReviewsByProductId);

// GET /api/reviews/user - Get reviews by the logged-in user
router.get("/user", isLogin, getReviewsByUserId);

// GET /api/reviews - Get all reviews (admin only)
router.get("/", isLogin, isAdmin, getAllReviews);

// POST /api/reviews - Add a new review (logged-in user)
router.post("/", isLogin, addReview);

// PUT /api/reviews/:id - Update a review (logged-in user)
router.put("/:id", isLogin, updateReview);

// DELETE /api/reviews/:id - Delete a review (logged-in user or admin)
router.delete("/:id", isLogin, deleteReview);

export default router;