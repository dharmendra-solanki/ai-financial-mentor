import { Router } from "express";
import { monthlyReport } from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/monthly", authMiddleware, monthlyReport);

export default router;