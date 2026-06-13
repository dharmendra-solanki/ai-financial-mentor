import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createIncome,
  deleteIncome,
  getUserIncomes,
  updateIncome,
} from "../services/income.service";
import {
  createIncomeValidation,
  updateIncomeValidation,
} from "../validations/income.validation";

export const addIncome = async (
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

    const validatedData = createIncomeValidation.parse(req.body);
    const income = await createIncome(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: income,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to add income",
    });
  }
};

export const getIncomes = async (
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

    const incomes = await getUserIncomes(userId);

    res.status(200).json({
      success: true,
      message: "Incomes fetched successfully",
      data: incomes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch incomes",
    });
  }
};

export const editIncome = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const incomeId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!incomeId) {
      res.status(400).json({
        success: false,
        message: "Invalid income id",
      });
      return;
    }

    const validatedData = updateIncomeValidation.parse(req.body);
    const income = await updateIncome(userId, incomeId, validatedData);

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      data: income,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update income",
    });
  }
};

export const removeIncome = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const incomeId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!incomeId) {
      res.status(400).json({
        success: false,
        message: "Invalid income id",
      });
      return;
    }

    await deleteIncome(userId, incomeId);

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete income",
    });
  }
};