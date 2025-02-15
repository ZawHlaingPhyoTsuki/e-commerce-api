import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import {  TCreateOrder, TIdOrder } from "../types/general";
import { OrderStatus } from "@prisma/client";

const orderService = new OrderService();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    sendSuccessResponse(res, orders);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId : TIdOrder = req.params.id
    const order = await orderService.getOrderById(orderId);
    sendSuccessResponse(res, order);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TCreateOrder = req.body;
    const newOrder = await orderService.createOrder(orderData);
    sendSuccessResponse(res, newOrder, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error creating order", 400);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId : TIdOrder = req.params.id
    const { status } : { status: OrderStatus} = req.body;
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    sendSuccessResponse(res, updatedOrder);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating order status", 400);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId : TIdOrder = req.params.id
    await orderService.deleteOrder(orderId);
    sendSuccessNoDataResponse(res, "Order deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting order", 400);
  }
};
