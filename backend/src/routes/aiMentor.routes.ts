import { Router } from "express";
import { askAi, getAiChats } from "../controllers/aiMentor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/chat", authMiddleware, askAi);
router.get("/chats", authMiddleware, getAiChats);

export default router;