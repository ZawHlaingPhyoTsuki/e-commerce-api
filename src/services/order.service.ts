import { prisma } from "../utils/prisma.server";
import { TOrder, TCreateOrder, TIdOrder } from "../types/general";
import { OrderStatus } from "@prisma/client";

export class OrderService {
  public async getAllOrders(): Promise<TOrder[]> {
    return await prisma.order.findMany({
      include: { items: true, payment: true },
    });
  }

  public async getOrderById(id: TIdOrder): Promise<TOrder> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, payment: true },
    });
    if (!order) throw new Error("Order not found");
    return order;
  }

  public async createOrder(data: TCreateOrder): Promise<TOrder> {
    return await prisma.order.create({ data });
  }

  public async updateOrderStatus(
    id: TIdOrder,
    status: OrderStatus
  ): Promise<TOrder> {
    return await prisma.order.update({ where: { id }, data: { status } });
  }

  public async deleteOrder(id: TIdOrder): Promise<void> {
    await prisma.order.delete({ where: { id } });
  }
}
