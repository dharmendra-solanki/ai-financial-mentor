import { Router } from "express";
import {
  addIncome,
  editIncome,
  getIncomes,
  removeIncome,
} from "../controllers/income.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addIncome);
router.get("/", authMiddleware, getIncomes);
router.put("/:id", authMiddleware, editIncome);
router.delete("/:id", authMiddleware, removeIncome);

export default router;