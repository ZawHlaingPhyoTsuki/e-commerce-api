import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { isLogin, isAdmin } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { updateUserSchema } from "../types/zod";

const router = express.Router();

router.get("/", isLogin, isAdmin, getAllUsers);
router.get("/:id", isLogin, getUserById);
router.put("/:id", isLogin, validate(updateUserSchema), updateUser);
router.delete("/:id", isLogin, isAdmin, deleteUser);

export default router;
