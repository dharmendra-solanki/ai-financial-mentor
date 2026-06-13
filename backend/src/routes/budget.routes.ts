import { Router } from "express";
import {
  addBudget,
  editBudget,
  getBudgets,
  removeBudget,
} from "../controllers/budget.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addBudget);
router.get("/", authMiddleware, getBudgets);
router.put("/:id", authMiddleware, editBudget);
router.delete("/:id", authMiddleware, removeBudget);

export default router;