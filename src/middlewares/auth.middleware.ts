import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  sendBadRequestResponse,
  sendForbiddenResponse,
} from "../utils/responseHandler";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendBadRequestResponse(res, "Unauthorized - you need to login");
  }

  const token = authHeader?.split(" ")[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
        userId: string;
        role: string;
      };
      req.user = decoded; // Attach user data to the request object
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      sendBadRequestResponse(res, "Access token expired");
    }
    sendBadRequestResponse(res, "Invalid token");
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as { userId: string; role: string }; // Extract user from request

  if (!user || user.role !== "ADMIN") {
    sendForbiddenResponse(res, "Forbidden - You are not admin");
  }

  next(); // Pass control to the next middleware or route handler
};
