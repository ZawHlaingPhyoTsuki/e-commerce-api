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
    const { userId, productId } = data;

    // Check if the item already exists in the wishlist
    const existingWishlistItem = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingWishlistItem) {
      // If it exists, return it
      return existingWishlistItem;
    }

    // Otherwise, create a new wishlist item
    return await prisma.wishlistItem.create({
      data,
    });
  }

  public async removeFromWishlist(
    wishlistItemId: TIdWishlistItem
  ): Promise<void> {
    await prisma.wishlistItem.delete({ where: { id: wishlistItemId } });
  }

  public async clearWishlist(userId: TIdUser): Promise<void> {
    await prisma.wishlistItem.deleteMany({ where: { userId } });
  }
}
