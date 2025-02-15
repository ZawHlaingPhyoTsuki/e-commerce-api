import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { AuthService } from "../services/auth.service";
import { TIdUser } from "../types/general";
import { send } from "process";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);

    // Destructure and exclude the refreshToken
    const { refreshToken, ...userWithoutRefreshToken } = user;

    // Set the refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendSuccessResponse(res, userWithoutRefreshToken, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing Up", 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      email,
      password
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
    });
    sendSuccessResponse(res, accessToken, 200);
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing In", 400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    sendSuccessNoDataResponse(res, "Signed out successfully", 200);
  } catch (error: any) {
    sendErrorResponse(res, "Error Signing Out", 400);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const token = await authService.refreshToken(refreshToken);
    sendSuccessResponse(res, token, 200);
  } catch (error: any) {
    sendErrorResponse(res, "Error refreshing token", 400);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Get user ID from token (req.user from mi)
    const userId: TIdUser = req.user?.userId;
    const user = await authService.getCurrentUser(userId);
    sendSuccessResponse(res, user);
  } catch (error: any) {
    sendErrorResponse(res, "Error getting current user", 400);
  }
};
