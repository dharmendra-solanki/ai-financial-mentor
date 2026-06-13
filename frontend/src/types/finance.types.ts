export interface Income {
  id: number;
  userId: number;
  source: string;
  amount: string | number;
  date: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Expense {
  id: number;
  userId: number;
  category: string;
  amount: string | number;
  date: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Budget {
  id: number;
  userId: number;
  category: string;
  limitAmount: string | number;
  month: number;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  totalBudget: number;
  budgetUsedPercentage: number;
  recentIncomes: Income[];
  recentExpenses: Expense[];
}

export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

export interface ApiSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}