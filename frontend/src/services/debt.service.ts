import api from "./api";
import type { ApiListResponse, ApiSingleResponse } from "../types/finance.types";

export interface Debt {
  id: number;
  userId: number;
  lenderName: string;
  totalAmount: string | number;
  remainingAmount: string | number;
  emiAmount: string | number;
  interestRate?: string | number;
  dueDate?: string;
  note?: string;
  paidAmount?: number;
  progressPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DebtInput {
  lenderName: string;
  totalAmount: number;
  remainingAmount: number;
  emiAmount: number;
  interestRate?: number;
  dueDate?: string;
  note?: string;
}

export const getDebts = async (): Promise<Debt[]> => {
  const response = await api.get<ApiListResponse<Debt>>("/api/debts");
  return response.data.data;
};

export const createDebt = async (data: DebtInput): Promise<Debt> => {
  const response = await api.post<ApiSingleResponse<Debt>>("/api/debts", data);
  return response.data.data;
};

export const updateDebt = async (
  id: number,
  data: DebtInput
): Promise<Debt> => {
  const response = await api.put<ApiSingleResponse<Debt>>(
    `/api/debts/${id}`,
    data
  );
  return response.data.data;
};

export const deleteDebt = async (id: number): Promise<void> => {
  await api.delete(`/api/debts/${id}`);
};