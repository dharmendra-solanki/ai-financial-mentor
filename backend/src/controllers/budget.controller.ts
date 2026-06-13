import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createBudget,
  deleteBudget,
  getUserBudgets,
  updateBudget,
} from "../services/budget.service";
import {
  createBudgetValidation,
  updateBudgetValidation,
} from "../validations/budget.validation";

export const addBudget = async (
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

    const validatedData = createBudgetValidation.parse(req.body);
    const budget = await createBudget(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "Budget added successfully",
      data: budget,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to add budget",
    });
  }
};

export const getBudgets = async (
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

    const budgets = await getUserBudgets(userId);

    res.status(200).json({
      success: true,
      message: "Budgets fetched successfully",
      data: budgets,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch budgets",
    });
  }
};

export const editBudget = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const budgetId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!budgetId) {
      res.status(400).json({
        success: false,
        message: "Invalid budget id",
      });
      return;
    }

    const validatedData = updateBudgetValidation.parse(req.body);
    const budget = await updateBudget(userId, budgetId, validatedData);

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: budget,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update budget",
    });
  }
};

export const removeBudget = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const budgetId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!budgetId) {
      res.status(400).json({
        success: false,
        message: "Invalid budget id",
      });
      return;
    }

    await deleteBudget(userId, budgetId);

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete budget",
    });
  }
};