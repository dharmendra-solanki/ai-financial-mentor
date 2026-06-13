import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createDebt,
  deleteDebt,
  getUserDebts,
  updateDebt,
} from "../services/debt.service";
import {
  createDebtValidation,
  updateDebtValidation,
} from "../validations/debt.validation";

export const addDebt = async (
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

    const validatedData = createDebtValidation.parse(req.body);
    const debt = await createDebt(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "Debt added successfully",
      data: debt,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to add debt",
    });
  }
};

export const getDebts = async (
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

    const debts = await getUserDebts(userId);

    res.status(200).json({
      success: true,
      message: "Debts fetched successfully",
      data: debts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch debts",
    });
  }
};

export const editDebt = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const debtId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!debtId) {
      res.status(400).json({
        success: false,
        message: "Invalid debt id",
      });
      return;
    }

    const validatedData = updateDebtValidation.parse(req.body);
    const debt = await updateDebt(userId, debtId, validatedData);

    res.status(200).json({
      success: true,
      message: "Debt updated successfully",
      data: debt,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update debt",
    });
  }
};

export const removeDebt = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const debtId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!debtId) {
      res.status(400).json({
        success: false,
        message: "Invalid debt id",
      });
      return;
    }

    await deleteDebt(userId, debtId);

    res.status(200).json({
      success: true,
      message: "Debt deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete debt",
    });
  }
};