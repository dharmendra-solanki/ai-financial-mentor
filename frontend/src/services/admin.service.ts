import api from "./api";

export interface AdminStats {
  totalUsers: number;
  totalIncomes: number;
  totalExpenses: number;
  totalBudgets: number;
  totalGoals: number;
  totalDebts: number;
  totalAiChats: number;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  profile?: {
    occupation?: string;
    country?: string;
    riskLevel?: "LOW" | "MEDIUM" | "HIGH";
  } | null;
  _count: {
    incomes: number;
    expenses: number;
    budgets: number;
    savingsGoals: number;
    debts: number;
    aiChats: number;
  };
}

interface ApiSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await api.get<ApiSingleResponse<AdminStats>>(
    "/api/admin/stats"
  );

  return response.data.data;
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await api.get<ApiListResponse<AdminUser>>(
    "/api/admin/users"
  );

  return response.data.data;
};

export const deleteAdminUser = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/users/${id}`);
};