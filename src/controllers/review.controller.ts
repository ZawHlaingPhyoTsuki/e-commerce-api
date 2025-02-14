import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { TReview, TCreateReview, TIdReview } from "../types/general";

const reviewService = new ReviewService();

export const getReviewsByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const reviews = await reviewService.getReviewsByProductId(productId);
    sendSuccessResponse(res, reviews);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const reviewData: TCreateReview = req.body;
    const newReview = await reviewService.createReview(reviewData);
    sendSuccessResponse(res, newReview, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error creating review", 400);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId : TIdReview = req.params.id 
    await reviewService.deleteReview(reviewId);
    sendSuccessNoDataResponse(res, "Review deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting review", 400);
  }
};
