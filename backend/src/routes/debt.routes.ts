import { Router } from "express";
import {
  addDebt,
  editDebt,
  getDebts,
  removeDebt,
} from "../controllers/debt.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addDebt);
router.get("/", authMiddleware, getDebts);
router.put("/:id", authMiddleware, editDebt);
router.delete("/:id", authMiddleware, removeDebt);

export default router;