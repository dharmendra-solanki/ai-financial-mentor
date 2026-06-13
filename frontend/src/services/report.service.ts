import api from "./api";
import type { ApiSingleResponse, Expense } from "../types/finance.types";

export interface BudgetSummary {
  category: string;
  limitAmount: number;
  usedAmount: number;
  remainingAmount: number;
  usedPercentage: number;
}

export interface MonthlyReport {
  month: number;
  year: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseByCategory: Record<string, number>;
  budgetSummary: BudgetSummary[];
  expenses: Expense[];
}

export const getMonthlyReport = async (
  month: number,
  year: number
): Promise<MonthlyReport> => {
  const response = await api.get<ApiSingleResponse<MonthlyReport>>(
    `/api/reports/monthly?month=${month}&year=${year}`
  );

  return response.data.data;
};