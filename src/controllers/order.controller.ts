import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import {
  TCreateOrder,
  TIdOrder,
  TIdUser,
  TUpdateOrderStatus,
} from "../types/general";

const orderService = new OrderService();

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    const orderData: TCreateOrder = req.body;
    orderData.userId = userId;
    const order = await orderService.createOrder(orderData);
    sendSuccessResponse(res, order, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error creating order", 400);
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as TIdOrder;
    const userId = req.user?.userId as TIdUser;
    const isAdmin = req.user?.role === "ADMIN";
    const order = await orderService.getOrderById(orderId, userId, isAdmin);
    sendSuccessResponse(res, order);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Get orders by the logged-in user
export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    const orders = await orderService.getOrdersByUserId(userId);
    sendSuccessResponse(res, orders);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    sendSuccessResponse(res, orders);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as TIdOrder;
    const statusData: TUpdateOrderStatus = req.body;
    const updatedOrder = await orderService.updateOrderStatus(
      orderId,
      statusData
    );
    sendSuccessResponse(res, updatedOrder);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating order status", 400);
  }
};

// Delete an order (admin only)
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as TIdOrder;
    await orderService.deleteOrder(orderId);
    sendSuccessNoDataResponse(res, "Order deleted");
  } catch (error: any) {
    console.error(`Error deleting order: ${error.message}`);
    sendErrorResponse(res, "Error deleting order", 400);
  }
};
