import {
  TCategory,
  TCreateCategory,
  TIdCategory,
  TUpdateCategory,
} from "../types/general";
import { prisma } from "../utils/prisma.server";

export class CategoryService {
  public async getAllCategories(): Promise<TCategory[]> {
    return await prisma.category.findMany();
  }

  public async getCategoryById(id: TIdCategory): Promise<TCategory> {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!category) throw new Error("Category not found");
    return category;
  }

  public async createCategory(data: TCreateCategory) : Promise<TCategory> {
    return await prisma.category.create({ data });
  }

  public async updateCategory(id: TIdCategory, data: TUpdateCategory) : Promise<TCategory> {
    return await prisma.category.update({ where: { id }, data });
  }

  public async deleteCategory(id: TIdCategory): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
