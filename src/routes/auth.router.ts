import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
} from "../controllers/auth.controller";
import { isLogin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLogin, logout);
router.post("/refresh-token", refreshToken);
router.get("/me", isLogin, getCurrentUser);

export default router;
