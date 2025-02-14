import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { TIdUser, TUpdateUser } from "../types/general";

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    sendSuccessResponse(res, users);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId : TIdUser = req.params.id;
    const user = await userService.getUserById(userId);
    sendSuccessResponse(res, user);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId : TIdUser = req.params.id;
    const updatedData : TUpdateUser = req.body;
    const updatedUser = await userService.updateUser(userId, updatedData);
    sendSuccessResponse(res, updatedUser);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating user", 400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId : TIdUser = req.params.id;
    await userService.deleteUser(userId);
    sendSuccessNoDataResponse(res, "User deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting user", 400);
  }
};
