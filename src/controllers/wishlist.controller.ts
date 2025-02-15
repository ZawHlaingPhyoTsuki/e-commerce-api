import { Request, Response } from "express";
import { WishlistService } from "../services/wishlist.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import {
  TCreateWishlistItem,
  TIdWishlistItem,
  TIdUser,
} from "../types/general";

const wishlistService = new WishlistService();

export const getWishlistByUserId = async (req: Request, res: Response) => {
  try {
    const userId : TIdUser = req.user?.userId;
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    sendSuccessResponse(res, wishlist);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    const wishlistData: TCreateWishlistItem = req.body;
    wishlistData.userId = userId;
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

export const clearWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as TIdUser;
    await wishlistService.clearWishlist(userId);
    sendSuccessNoDataResponse(res, "Wishlist cleared");
  } catch (error: any) {
    sendErrorResponse(res, "Error clearing wishlist", 400);
  }
};
