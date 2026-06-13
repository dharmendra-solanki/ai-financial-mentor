import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { askAiMentor, getUserAiChats } from "../services/aiMentor.service";
import { aiChatValidation } from "../validations/aiMentor.validation";

export const askAi = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const validatedData = aiChatValidation.parse(req.body);
    const chat = await askAiMentor(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "AI advice generated successfully",
      data: chat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to generate AI advice",
    });
  }
};

export const getAiChats = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const chats = await getUserAiChats(userId);

    res.status(200).json({
      success: true,
      message: "AI chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch AI chats",
    });
  }
};