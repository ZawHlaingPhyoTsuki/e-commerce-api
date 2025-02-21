import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma.server";
import { TIdUser, TUpdateCurrentUser } from "../types/general";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyRefreshToken,
} from "../utils/auth.utils";

export class AuthService {
  public async register(username: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken,
      refreshToken,
    };
  }

  public async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    return { accessToken, refreshToken };
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken) as {
      userId: string;
      role: string;
    };

    // Generate a new access token
    const newAccessToken = generateAccessToken(decoded.userId, decoded.role);

    return newAccessToken;
  }

  public async getCurrentUser(userId: TIdUser) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true, cart: true, wishlist: true, reviews: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  public async updateCurrentUser(
    userId: TIdUser,
    updatedData: TUpdateCurrentUser
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  public async deleteCurrentUser(userId: TIdUser) {
    try {
      // Start a transaction to ensure atomicity
      await prisma.$transaction(async (prisma) => {
        // Step 1: Delete all related cart items, wishlist items, and reviews
        await prisma.cartItem.deleteMany({ where: { userId } });
        await prisma.wishlistItem.deleteMany({ where: { userId } });
        await prisma.review.deleteMany({ where: { userId } });

        // Step 2: Handle orders and their related records
        const orders = await prisma.order.findMany({
          where: { userId },
          select: { id: true },
        });

        // Delete payments and order items for each order
        for (const { id: orderId } of orders) {
          await prisma.payment.deleteMany({ where: { orderId } });
          await prisma.orderItem.deleteMany({ where: { orderId } });
        }

        // Delete all orders associated with the user
        await prisma.order.deleteMany({ where: { userId } });

        // Step 3: Finally, delete the user
        await prisma.user.delete({ where: { id: userId } });
      });
      console.log(
        `User with ID ${userId} and all related data successfully deleted.`
      );
    } catch (error) {
      console.log(`Error while deleting user with Id ${userId}:`, error);
      throw new Error("Failed to delete user. Please try again later.");
    }
  }
}
