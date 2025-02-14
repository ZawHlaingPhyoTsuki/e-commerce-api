import { prisma } from "../utils/prisma.server";
import { TUser, TUpdateUser, TIdUser } from "../types/general";

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

  public async updateUser(id: TIdUser, data: TUpdateUser): Promise<TUser> {
    return await prisma.user.update({ where: { id }, data });
  }

  public async deleteUser(id: TIdUser): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
