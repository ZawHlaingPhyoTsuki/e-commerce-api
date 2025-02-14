import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { AuthService } from "../services/auth.service";
import { TIdUser } from "../types/general";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    sendSuccessResponse(res, user, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing Up", 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.status(200).json(tokens);
    // sendSuccessResponse(res, tokens)
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing In", 400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId : TIdUser = req.user?.userId; // Extract user ID from the request
    await authService.logout(userId);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing Out", 400);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.status(200).json(tokens);
  } catch (error: any) {
    sendErrorResponse(res, "Error refreshing token", 400);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Get user ID from token (req.user from mi)
    const userId : TIdUser = req.user?.userId;
    const user = await authService.getCurrentUser(userId);
    sendSuccessResponse(res, user);
  } catch (error: any) {
    sendErrorResponse(res, "Error getting current user", 400);
  }
};
