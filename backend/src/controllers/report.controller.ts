import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getMonthlyReport } from "../services/report.service";

export const monthlyReport = async (
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

    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || month < 1 || month > 12) {
      res.status(400).json({
        success: false,
        message: "Valid month is required",
      });
      return;
    }

    if (!year || year < 2000) {
      res.status(400).json({
        success: false,
        message: "Valid year is required",
      });
      return;
    }

    const report = await getMonthlyReport(userId, month, year);

    res.status(200).json({
      success: true,
      message: "Monthly report fetched successfully",
      data: report,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch report",
    });
  }
};