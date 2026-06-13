import { Router } from "express";
import {
  addExpense,
  editExpense,
  getExpenses,
  removeExpense,
} from "../controllers/expense.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.put("/:id", authMiddleware, editExpense);
router.delete("/:id", authMiddleware, removeExpense);

export default router;