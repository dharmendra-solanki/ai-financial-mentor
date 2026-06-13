import { Router } from "express";
import { getSummary } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/summary", authMiddleware, getSummary);

export default router;