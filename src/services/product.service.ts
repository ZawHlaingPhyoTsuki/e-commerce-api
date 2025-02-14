import { prisma } from "../utils/prisma.server";

export class ProductService {
  public async getAllProducts(category?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where = category ? { categoryId: category } : {};
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: { category: true },
    });
    const total = await prisma.product.count({ where });
    return { products, total };
  }

  public async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!product) throw new Error("Product not found");
    return product;
  }

  public async createProduct(data: any) {
    return await prisma.product.create({ data });
  }

  public async updateProduct(id: string, data: any) {
    return await prisma.product.update({ where: { id }, data });
  }

  public async deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
  }
}
