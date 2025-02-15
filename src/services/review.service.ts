import { prisma } from "../utils/prisma.server";
import {
  TReview,
  TCreateReview,
  TIdReview,
  TIdUser,
  TUpdateReview,
} from "../types/general";

export class ReviewService {
  // Get reviews for a product
  public async getReviewsByProductId(productId: string): Promise<TReview[]> {
    return await prisma.review.findMany({
      where: { productId },
      include: { user: true, product: true },
    });
  }

  // Get reviews by a user
  public async getReviewsByUserId(userId: TIdUser): Promise<TReview[]> {
    return await prisma.review.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  // Get all reviews (admin only)
  public async getAllReviews(): Promise<TReview[]> {
    return await prisma.review.findMany({
      include: { user: true, product: true },
    });
  }

  // Add a new review
  public async addReview(data: TCreateReview): Promise<TReview> {
    return await prisma.review.create({
      data,
    });
  }

  // Update a review
  public async updateReview(
    reviewId: TIdReview,
    userId: TIdUser,
    data: TUpdateReview,
  ): Promise<TReview> {
    const where = {id: reviewId, userId };
    return await prisma.review.update({
      where,
      data,
    });
  }

  // Delete a review
  public async deleteReview(
    reviewId: TIdReview,
    userId: TIdUser,
    isAdmin: boolean = false
  ): Promise<void> {
    const where = isAdmin ? { id: reviewId } : { id: reviewId, userId };
    await prisma.review.delete({
      where,
    });
  }
}
