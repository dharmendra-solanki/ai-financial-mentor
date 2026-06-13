import prisma from "../prisma/prisma.client";

export const getUserNotifications = async (userId: number) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [budgets, expenses, debts, savingsGoals] = await Promise.all([
    prisma.budget.findMany({
      where: {
        userId,
        month: currentMonth,
        year: currentYear,
      },
    }),

    prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: new Date(currentYear, currentMonth - 1, 1),
          lt: new Date(currentYear, currentMonth, 1),
        },
      },
    }),

    prisma.debt.findMany({
      where: {
        userId,
      },
    }),

    prisma.savingsGoal.findMany({
      where: {
        userId,
      },
    }),
  ]);

  const notifications = [];

  for (const budget of budgets) {
    const usedAmount = expenses
      .filter((expense) => expense.category === budget.category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    const limitAmount = Number(budget.limitAmount);
    const usedPercentage =
      limitAmount > 0 ? (usedAmount / limitAmount) * 100 : 0;

    if (usedPercentage >= 80) {
      notifications.push({
        type: "BUDGET_WARNING",
        title: "Budget limit warning",
        message: `${budget.category} budget is ${usedPercentage.toFixed(
          2
        )}% used.`,
      });
    }
  }

  for (const debt of debts) {
    if (!debt.dueDate) continue;

    const daysLeft = Math.ceil(
      (debt.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft >= 0 && daysLeft <= 7) {
      notifications.push({
        type: "EMI_REMINDER",
        title: "Upcoming EMI reminder",
        message: `${debt.lenderName} EMI of ${debt.emiAmount} is due in ${daysLeft} days.`,
      });
    }
  }

  for (const goal of savingsGoals) {
    const targetAmount = Number(goal.targetAmount);
    const currentAmount = Number(goal.currentAmount);
    const progress =
      targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

    if (progress < 50) {
      notifications.push({
        type: "SAVINGS_GOAL_REMINDER",
        title: "Savings goal reminder",
        message: `${goal.title} is only ${progress.toFixed(
          2
        )}% completed. Try saving more this month.`,
      });
    }
  }

  return notifications;
};