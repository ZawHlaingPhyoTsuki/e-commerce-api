import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/responseHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  sendErrorResponse(res, "Something went wrong", 500);
};
