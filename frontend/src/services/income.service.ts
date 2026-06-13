import api from "./api";
import type {
  ApiListResponse,
  ApiSingleResponse,
  Income,
} from "../types/finance.types";

export interface IncomeInput {
  source: string;
  amount: number;
  date: string;
  note?: string;
}

export const getIncomes = async (): Promise<Income[]> => {
  const response = await api.get<ApiListResponse<Income>>("/api/income");
  return response.data.data;
};

export const createIncome = async (data: IncomeInput): Promise<Income> => {
  const response = await api.post<ApiSingleResponse<Income>>("/api/income", data);
  return response.data.data;
};

export const updateIncome = async (
  id: number,
  data: IncomeInput
): Promise<Income> => {
  const response = await api.put<ApiSingleResponse<Income>>(
    `/api/income/${id}`,
    data
  );
  return response.data.data;
};

export const deleteIncome = async (id: number): Promise<void> => {
  await api.delete(`/api/income/${id}`);
};