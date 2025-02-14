import { Request, Response } from "express";
import { WishlistService } from "../services/wishlist.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import {
  TWishlistItem,
  TCreateWishlistItem,
  TIdWishlistItem,
} from "../types/general";

const wishlistService = new WishlistService();

export const getWishlistByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    sendSuccessResponse(res, wishlist);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const wishlistData: TCreateWishlistItem = req.body;
    const wishlistItem = await wishlistService.addToWishlist(wishlistData);
    sendSuccessResponse(res, wishlistItem, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error adding to wishlist", 400);
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const wishlistItemId = req.params.id as TIdWishlistItem;
    await wishlistService.removeFromWishlist(wishlistItemId);
    sendSuccessNoDataResponse(res, "Item removed from wishlist");
  } catch (error: any) {
    sendErrorResponse(res, "Error removing from wishlist", 400);
  }
};
