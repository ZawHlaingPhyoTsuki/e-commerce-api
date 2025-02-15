import { prisma } from "../utils/prisma.server";
import {
  TIdUser,
  TCartItem,
  TCreateCartItem,
  TUpdateCartItem,
} from "../types/general";

export class CartService {
  // Get all cart items for a specific user
  public async getCartByUserId(userId: TIdUser) {
    // console.log(userId)
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    if (!cart) throw new Error("Cart not found");
    return cart;
  }

  // Add a new item to the cart
  public async addToCart(data: TCreateCartItem): Promise<TCartItem> {
    const { userId, productId, quantity } = data;

    // Check if the item already exists in the cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingCartItem) {
      // If it exists, update the quantity
      return await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    }

    // Otherwise, create a new cart item
    return await prisma.cartItem.create({ data });
  }

  // Update an existing cart item, only quantity
  public async updateCartItemQuantity(data: TUpdateCartItem) {
    const { id, userId, quantity } = data;

    // Ensure the cart item belongs to the user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id, userId },
    });

    if (!cartItem) {
      throw new Error("Cart item not found or does not belong to the user");
    }

    // Update the quantity
    return await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  // Remove an item from the cart
  public async removeFromCart(cartItemId: string): Promise<void> {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  // Clear all items from a user's cart
  public async clearCart(userId: TIdUser): Promise<void> {
    await prisma.cartItem.deleteMany({ where: { userId } });
  }
}
