import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createExpense,
  deleteExpense,
  getUserExpenses,
  updateExpense,
} from "../services/expense.service";
import {
  createExpenseValidation,
  updateExpenseValidation,
} from "../validations/expense.validation";

export const addExpense = async (
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

    const validatedData = createExpenseValidation.parse(req.body);
    const expense = await createExpense(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to add expense",
    });
  }
};

export const getExpenses = async (
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

    const expenses = await getUserExpenses(userId);

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch expenses",
    });
  }
};

export const editExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const expenseId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!expenseId) {
      res.status(400).json({
        success: false,
        message: "Invalid expense id",
      });
      return;
    }

    const validatedData = updateExpenseValidation.parse(req.body);
    const expense = await updateExpense(userId, expenseId, validatedData);

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update expense",
    });
  }
};

export const removeExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const expenseId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!expenseId) {
      res.status(400).json({
        success: false,
        message: "Invalid expense id",
      });
      return;
    }

    await deleteExpense(userId, expenseId);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete expense",
    });
  }
};