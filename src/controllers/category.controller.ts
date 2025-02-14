import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { CategoryService } from "../services/category.service";
import {
  TCreateCategory,
  TIdCategory,
  TUpdateCategory,
} from "../types/general";

const categoryService = new CategoryService();

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    sendSuccessResponse(res, categories);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: TIdCategory = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);
    sendSuccessResponse(res, category);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: TCreateCategory = req.body;
    const newCategory = await categoryService.createCategory(categoryData);
    sendSuccessResponse(res, newCategory, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error creating category", 400);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId: TIdCategory = req.params.id;
    const updatedData: TUpdateCategory = req.body;
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      updatedData
    );
    sendSuccessResponse(res, updatedCategory);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating category", 400);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId: TIdCategory = req.params.id;
    await categoryService.deleteCategory(categoryId);
    sendSuccessNoDataResponse(res, "Category deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting category", 400);
  }
};
