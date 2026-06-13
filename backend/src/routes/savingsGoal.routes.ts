import { Router } from "express";
import {
  addSavingsGoal,
  editSavingsGoal,
  getSavingsGoals,
  removeSavingsGoal,
} from "../controllers/savingsGoal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addSavingsGoal);
router.get("/", authMiddleware, getSavingsGoals);
router.put("/:id", authMiddleware, editSavingsGoal);
router.delete("/:id", authMiddleware, removeSavingsGoal);

export default router;