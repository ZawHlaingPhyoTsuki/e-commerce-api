import { TCreateCartItem, TIdUser, TUpdateCartItem } from "./../types/general";
import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";

import { CartService } from "../services/cart.service";

const cartService = new CartService();

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    // Get user ID from access token
    const userId = req.user?.userId;
    // console.log(`controlller ${userId}`)
    const cart = await cartService.getCartByUserId(userId);
    sendSuccessResponse(res, cart);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const data: TCreateCartItem = req.body;
    data.userId = userId;
    const cart = await cartService.addToCart(data);
    sendSuccessResponse(res, cart);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const userId: TIdUser = req.user?.userId;
    const cartItemId = req.params.id; // This should be the cartItemId, not productId
    const { quantity }: { quantity: number } = req.body;

    if (!userId || !cartItemId || quantity === undefined) {
      throw new Error("Missing required fields");
    }

    const data: TUpdateCartItem = {
      id: cartItemId,
      userId,
      quantity,
    };

    const cart = await cartService.updateCartItemQuantity(data);
    sendSuccessResponse(res, cart);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const removeCart = async (req: Request, res: Response) => {
  try {
    const cartItemId = req.params.id;
    await cartService.removeFromCart(cartItemId);
    sendSuccessNoDataResponse(res, "Item removed from cart");
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    await cartService.clearCart(userId);
    sendSuccessNoDataResponse(res, "Cart cleared");
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};