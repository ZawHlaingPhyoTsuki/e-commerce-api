import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import {
  TCreateReview,
  TIdReview,
  TIdUser,
  TUpdateReview,
} from "../types/general";

const reviewService = new ReviewService();

// Get reviews for a product (public)
export const getReviewsByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const reviews = await reviewService.getReviewsByProductId(productId);
    sendSuccessResponse(res, reviews);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Get reviews by the logged-in user
export const getReviewsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    const reviews = await reviewService.getReviewsByUserId(userId);
    sendSuccessResponse(res, reviews);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Get all reviews (admin only)
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllReviews();
    sendSuccessResponse(res, reviews);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Add a new review (logged-in user)
export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    const reviewData: TCreateReview = req.body;
    reviewData.userId = userId;
    const review = await reviewService.addReview(reviewData);
    sendSuccessResponse(res, review, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error adding review", 400);
  }
};

// Update a review (logged-in user)
export const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id as TIdReview;
    const userId = req.user?.userId as TIdUser;
    const reviewData: TUpdateReview = req.body;
    const updatedReview = await reviewService.updateReview(
      reviewId,
      userId,
      reviewData
    );
    sendSuccessResponse(res, updatedReview);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating review", 400);
  }
};

// Delete a review (logged-in user or admin)
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id as TIdReview;
    const userId = req.user?.userId as TIdUser;
    const isAdmin = req.user?.role === "ADMIN"; // Check if user is admin
    await reviewService.deleteReview(reviewId, userId, isAdmin);
    sendSuccessNoDataResponse(res, "Review deleted");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting review", 400);
  }
};
