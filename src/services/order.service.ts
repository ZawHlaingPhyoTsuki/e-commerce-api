import { prisma } from "../utils/prisma.server";
import {
  TOrder,
  TCreateOrder,
  TIdOrder,
  TIdUser,
  TUpdateOrderStatus,
} from "../types/general";

export class OrderService {
  // Create a new order
  public async createOrder(data: TCreateOrder): Promise<TOrder> {
    // Fetch product details and calculate total amount
    let totalAmount = 0;
    const itemsWithPrices = await Promise.all(
      data.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }

        // Use the product price from the database
        const price = product.price;
        totalAmount += price * item.quantity;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price, 
        };
      })
    );

    // Create the order
    return await prisma.order.create({
      data: {
        userId: data.userId,
        totalAmount, 
        status: data.status,
        items: {
          create: itemsWithPrices,
        },
      },
      include: { items: true, user: true },
    });
  }

  // Get order by ID
  public async getOrderById(
    orderId: TIdOrder,
    userId: TIdUser,
    isAdmin: boolean = false
  ): Promise<TOrder> {
    const where = isAdmin ? { id: orderId } : { id: orderId, userId };
    const order = await prisma.order.findUnique({
      where,
      include: { items: true, user: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  // Get orders by user ID
  public async getOrdersByUserId(userId: TIdUser): Promise<TOrder[]> {
    return await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }

  // Get all orders (admin only)
  public async getAllOrders(): Promise<TOrder[]> {
    return await prisma.order.findMany({
      include: { items: true, user: true },
    });
  }

  // Update order status
  public async updateOrderStatus(
    orderId: TIdOrder,
    data: TUpdateOrderStatus
  ): Promise<TOrder> {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: data.status },
      include: { items: true, user: true },
    });
  }

  // Delete an order
  public async deleteOrder(orderId: TIdOrder): Promise<void> {
    console.log(`orderId ${orderId}`);
    // Delete related OrderItem records first
    await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    // delete the order
    await prisma.order.delete({
      where: { id: orderId },
    });
  }
}
