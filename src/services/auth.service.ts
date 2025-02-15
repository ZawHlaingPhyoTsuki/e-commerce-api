import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.server";
import { TIdUser } from "../types/general";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.utils";

export class AuthService {
  public async register(username: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
}
