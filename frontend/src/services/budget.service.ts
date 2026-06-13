import api from "./api";
import type {
  ApiListResponse,
  ApiSingleResponse,
  Budget,
} from "../types/finance.types";

export interface BudgetInput {
  category: string;
  limitAmount: number;
  month: number;
  year: number;
}

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get<ApiListResponse<Budget>>("/api/budgets");
  return response.data.data;
};

export const createBudget = async (data: BudgetInput): Promise<Budget> => {
  const response = await api.post<ApiSingleResponse<Budget>>(
    "/api/budgets",
    data
  );
  return response.data.data;
};

export const updateBudget = async (
  id: number,
  data: BudgetInput
): Promise<Budget> => {
  const response = await api.put<ApiSingleResponse<Budget>>(
    `/api/budgets/${id}`,
    data
  );
  return response.data.data;
};

export const deleteBudget = async (id: number): Promise<void> => {
  await api.delete(`/api/budgets/${id}`);
};