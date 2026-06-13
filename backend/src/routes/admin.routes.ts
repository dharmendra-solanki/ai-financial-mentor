import { Router } from "express";
import {
  getAdminStats,
  getUsers,
  removeUser,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);
router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, removeUser);

export default router;