import prisma from "../prisma/prisma.client";

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    totalIncomes,
    totalExpenses,
    totalBudgets,
    totalGoals,
    totalDebts,
    totalAiChats,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.income.count(),
    prisma.expense.count(),
    prisma.budget.count(),
    prisma.savingsGoal.count(),
    prisma.debt.count(),
    prisma.aiChat.count(),
  ]);

  return {
    totalUsers,
    totalIncomes,
    totalExpenses,
    totalBudgets,
    totalGoals,
    totalDebts,
    totalAiChats,
  };
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      profile: true,
      _count: {
        select: {
          incomes: true,
          expenses: true,
          budgets: true,
          savingsGoals: true,
          debts: true,
          aiChats: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteUserByAdmin = async (userId: number) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};