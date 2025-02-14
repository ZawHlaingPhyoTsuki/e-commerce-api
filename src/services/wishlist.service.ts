import { prisma } from "../utils/prisma.server";
import {
  TWishlistItem,
  TCreateWishlistItem,
  TIdWishlistItem,
  TIdUser,
} from "../types/general";

export class WishlistService {
  public async getWishlistByUserId(userId: TIdUser): Promise<TWishlistItem[]> {
    return await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  public async addToWishlist(
    data: TCreateWishlistItem
  ): Promise<TWishlistItem> {
    return await prisma.wishlistItem.create({ data });
  }

  public async removeFromWishlist(id: TIdWishlistItem): Promise<void> {
    await prisma.wishlistItem.delete({ where: { id } });
  }
}
