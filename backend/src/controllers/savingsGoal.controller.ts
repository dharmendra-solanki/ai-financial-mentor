import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createSavingsGoal,
  deleteSavingsGoal,
  getUserSavingsGoals,
  updateSavingsGoal,
} from "../services/savingsGoal.service";
import {
  createSavingsGoalValidation,
  updateSavingsGoalValidation,
} from "../validations/savingsGoal.validation";

export const addSavingsGoal = async (
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

    const validatedData = createSavingsGoalValidation.parse(req.body);
    const goal = await createSavingsGoal(userId, validatedData);

    res.status(201).json({
      success: true,
      message: "Savings goal added successfully",
      data: goal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add savings goal",
    });
  }
};

export const getSavingsGoals = async (
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

    const goals = await getUserSavingsGoals(userId);

    res.status(200).json({
      success: true,
      message: "Savings goals fetched successfully",
      data: goals,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch savings goals",
    });
  }
};

export const editSavingsGoal = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const goalId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!goalId) {
      res.status(400).json({
        success: false,
        message: "Invalid savings goal id",
      });
      return;
    }

    const validatedData = updateSavingsGoalValidation.parse(req.body);
    const goal = await updateSavingsGoal(userId, goalId, validatedData);

    res.status(200).json({
      success: true,
      message: "Savings goal updated successfully",
      data: goal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update savings goal",
    });
  }
};

export const removeSavingsGoal = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const goalId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!goalId) {
      res.status(400).json({
        success: false,
        message: "Invalid savings goal id",
      });
      return;
    }

    await deleteSavingsGoal(userId, goalId);

    res.status(200).json({
      success: true,
      message: "Savings goal deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete savings goal",
    });
  }
};