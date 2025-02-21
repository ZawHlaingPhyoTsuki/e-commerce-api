import { hashPassword } from "./../utils/auth.utils";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma.server";
import { TUser, TUpdateUser, TIdUser, TCreateUser } from "../types/general";
import { Role } from "@prisma/client";

export class UserService {
  public async getAllUsers(): Promise<TUser[]> {
    return await prisma.user.findMany();
  }

  public async getUserById(id: TIdUser): Promise<TUser> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { orders: true, cart: true, wishlist: true, reviews: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  public async createUser(data: TCreateUser): Promise<TUser> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    return await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: data.role || Role.USER,
      },
    });
  }

  public async updateUser(id: TIdUser, data: TUpdateUser): Promise<TUser> {
    return await prisma.user.update({ where: { id }, data });
  }

  public async deleteUser(id: TIdUser): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
