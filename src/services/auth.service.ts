import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.server";
import { TIdUser } from "../types/general";

export class AuthService {
  public async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return { id: user.id, username: user.username, email: user.email };
  }

  public async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" } // Short-lived access token
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" } // Long-lived refresh token
    );

    // Store refresh token in the database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    return { accessToken, refreshToken };
  }

  public async logout(userId: TIdUser) {
    // Delete all refresh tokens for the user
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  public async refreshToken(refreshToken: string) {
    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as {
      userId: string;
    };

    // Check if the refresh token exists in the database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return { accessToken };
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
