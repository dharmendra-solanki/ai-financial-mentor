import api from "./api";
import type {
  ApiListResponse,
  ApiSingleResponse,
  Expense,
} from "../types/finance.types";

export interface ExpenseInput {
  category: string;
  amount: number;
  date: string;
  note?: string;
}

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get<ApiListResponse<Expense>>("/api/expenses");
  return response.data.data;
};

export const createExpense = async (data: ExpenseInput): Promise<Expense> => {
  const response = await api.post<ApiSingleResponse<Expense>>(
    "/api/expenses",
    data
  );
  return response.data.data;
};

export const updateExpense = async (
  id: number,
  data: ExpenseInput
): Promise<Expense> => {
  const response = await api.put<ApiSingleResponse<Expense>>(
    `/api/expenses/${id}`,
    data
  );
  return response.data.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await api.delete(`/api/expenses/${id}`);
};