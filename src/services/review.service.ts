import { prisma } from "../utils/prisma.server";
import { TReview, TCreateReview, TIdReview, TIdProduct } from "../types/general";

export class ReviewService {
  public async getReviewsByProductId(productId: TIdProduct): Promise<TReview[]> {
    return await prisma.review.findMany({
      where: { productId },
      include: { user: true },
    });
  }

  public async createReview(data: TCreateReview): Promise<TReview> {
    return await prisma.review.create({ data });
  }

  public async deleteReview(id: TIdReview): Promise<void> {
    await prisma.review.delete({ where: { id } });
  }
}
