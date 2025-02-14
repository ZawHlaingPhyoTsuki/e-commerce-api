import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import {
  sendErrorResponse,
  sendNotFoundResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";

const productService = new ProductService();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const products = await productService.getAllProducts(
      category as string,
      parseInt(page as string),
      parseInt(limit as string)
    );
    sendSuccessResponse(res, products);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    sendSuccessResponse(res, product);
  } catch (error: any) {
    sendNotFoundResponse(res, error.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    sendSuccessResponse(res, newProduct, 201);
  } catch (error: any) {
    sendErrorResponse(res, "Error creating product", 400);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await productService.updateProduct(
      productId,
      updatedData
    );
    sendSuccessResponse(res, updatedProduct);
  } catch (error: any) {
    sendErrorResponse(res, "Error updating product");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    sendSuccessNoDataResponse(res, "Product deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, "Error deleting product", 400);
  }
};
