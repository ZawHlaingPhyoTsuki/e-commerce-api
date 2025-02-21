import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
  updateCurrentUser,
  deleteCurrentUser,
} from "../controllers/auth.controller";
import { isLogin } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/auth/register - Register a new user (Public)
router.post("/register", register);

// POST /api/auth/login - Login a user (Public)
router.post("/login", login);

// POST /api/auth/logout - Logout a user (Logged-in user)
router.post("/logout", isLogin, logout);

// POST /api/auth/refresh-token - Refresh access token (Logged-in user)
router.post("/refresh-token", refreshToken);

// GET /api/auth/me - Get current user (Logged-in user)
router.get("/me", isLogin, getCurrentUser);

// PUT /api/auth/me - Edit current user profile (Logged-in user)
router.put("/me", isLogin, updateCurrentUser);

// DELETE /api/auth/me - Delete current user (Logged-in user)
router.delete("/me", isLogin, deleteCurrentUser);

export default router;
