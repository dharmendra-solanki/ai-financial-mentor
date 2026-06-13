import prisma from "../prisma/prisma.client";

export const getMonthlyReport = async (
  userId: number,
  month: number,
  year: number
) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const [incomeResult, expenseResult, expenses, budgets] = await Promise.all([
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

    prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),

    prisma.budget.findMany({
      where: {
        userId,
        month,
        year,
      },
    }),
  ]);

  const totalIncome = Number(incomeResult._sum.amount || 0);
  const totalExpense = Number(expenseResult._sum.amount || 0);

  const expenseByCategory = expenses.reduce<Record<string, number>>(
    (result, expense) => {
      const amount = Number(expense.amount);
      result[expense.category] = (result[expense.category] || 0) + amount;
      return result;
    },
    {}
  );

  const budgetSummary = budgets.map((budget) => {
    const usedAmount = expenseByCategory[budget.category] || 0;
    const limitAmount = Number(budget.limitAmount);

    return {
      category: budget.category,
      limitAmount,
      usedAmount,
      remainingAmount: limitAmount - usedAmount,
      usedPercentage:
        limitAmount > 0 ? Number(((usedAmount / limitAmount) * 100).toFixed(2)) : 0,
    };
  });

  return {
    month,
    year,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    expenseByCategory,
    budgetSummary,
    expenses,
  };
};