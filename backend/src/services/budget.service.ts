import prisma from "../prisma/prisma.client";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
} from "../validations/budget.validation";

export const createBudget = async (
  userId: number,
  data: CreateBudgetInput
) => {
  return prisma.budget.create({
    data: {
      userId,
      category: data.category,
      limitAmount: data.limitAmount,
      month: data.month,
      year: data.year,
    },
  });
};

export const getUserBudgets = async (userId: number) => {
  return prisma.budget.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        year: "desc",
      },
      {
        month: "desc",
      },
    ],
  });
};

export const getBudgetById = async (userId: number, budgetId: number) => {
  const budget = await prisma.budget.findFirst({
    where: {
      id: budgetId,
      userId,
    },
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  return budget;
};

export const updateBudget = async (
  userId: number,
  budgetId: number,
  data: UpdateBudgetInput
) => {
  await getBudgetById(userId, budgetId);

  return prisma.budget.update({
    where: {
      id: budgetId,
    },
    data: {
      category: data.category,
      limitAmount: data.limitAmount,
      month: data.month,
      year: data.year,
    },
  });
};

export const deleteBudget = async (userId: number, budgetId: number) => {
  await getBudgetById(userId, budgetId);

  return prisma.budget.delete({
    where: {
      id: budgetId,
    },
  });
};