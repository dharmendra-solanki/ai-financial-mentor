import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  deleteUserByAdmin,
  getAdminDashboardStats,
  getAllUsers,
} from "../services/admin.service";

export const getAdminStats = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const stats = await getAdminDashboardStats();

    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch admin stats",
    });
  }
};

export const getUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch users",
    });
  }
};

export const removeUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id);

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
      return;
    }

    if (req.user?.userId === userId) {
      res.status(400).json({
        success: false,
        message: "Admin cannot delete own account",
      });
      return;
    }

    await deleteUserByAdmin(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete user",
    });
  }
};