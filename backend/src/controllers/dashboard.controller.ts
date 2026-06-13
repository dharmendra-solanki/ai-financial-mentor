import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getDashboardSummary } from "../services/dashboard.service";

export const getSummary = async (
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

    const summary = await getDashboardSummary(userId);

    res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard summary",
    });
  }
};