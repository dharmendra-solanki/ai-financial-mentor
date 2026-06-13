import prisma from "../prisma/prisma.client";

const getMonthDateRange = () => {
  const now = new Date();

  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    startDate,
    endDate,
  };
};

export const getDashboardSummary = async (userId: number) => {
  const { startDate, endDate } = getMonthDateRange();

  const [
    totalIncomeResult,
    totalExpenseResult,
    currentMonthIncomeResult,
    currentMonthExpenseResult,
    totalBudgetResult,
    recentIncomes,
    recentExpenses,
  ] = await Promise.all([
    prisma.income.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.expense.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.income.aggregate({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.expense.aggregate({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.budget.aggregate({
      where: {
        userId,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      _sum: {
        limitAmount: true,
      },
    }),

    prisma.income.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    }),

    prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    }),
  ]);

  const totalIncome = Number(totalIncomeResult._sum.amount || 0);
  const totalExpense = Number(totalExpenseResult._sum.amount || 0);
  const currentMonthIncome = Number(currentMonthIncomeResult._sum.amount || 0);
  const currentMonthExpense = Number(currentMonthExpenseResult._sum.amount || 0);
  const totalBudget = Number(totalBudgetResult._sum.limitAmount || 0);

  const budgetUsedPercentage =
    totalBudget > 0 ? Number(((currentMonthExpense / totalBudget) * 100).toFixed(2)) : 0;

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    currentMonthIncome,
    currentMonthExpense,
    totalBudget,
    budgetUsedPercentage,
    recentIncomes,
    recentExpenses,
  };
};