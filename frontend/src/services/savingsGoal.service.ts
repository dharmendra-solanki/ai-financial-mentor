import api from "./api";
import type { ApiListResponse, ApiSingleResponse } from "../types/finance.types";

export interface SavingsGoal {
  id: number;
  userId: number;
  title: string;
  targetAmount: string | number;
  currentAmount: string | number;
  deadline?: string;
  note?: string;
  progressPercentage?: number;
  remainingAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavingsGoalInput {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  deadline?: string;
  note?: string;
}

export const getSavingsGoals = async (): Promise<SavingsGoal[]> => {
  const response = await api.get<ApiListResponse<SavingsGoal>>(
    "/api/savings-goals"
  );
  return response.data.data;
};

export const createSavingsGoal = async (
  data: SavingsGoalInput
): Promise<SavingsGoal> => {
  const response = await api.post<ApiSingleResponse<SavingsGoal>>(
    "/api/savings-goals",
    data
  );
  return response.data.data;
};

export const updateSavingsGoal = async (
  id: number,
  data: SavingsGoalInput
): Promise<SavingsGoal> => {
  const response = await api.put<ApiSingleResponse<SavingsGoal>>(
    `/api/savings-goals/${id}`,
    data
  );
  return response.data.data;
};

export const deleteSavingsGoal = async (id: number): Promise<void> => {
  await api.delete(`/api/savings-goals/${id}`);
};