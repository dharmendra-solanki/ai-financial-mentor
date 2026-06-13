import prisma from "../prisma/prisma.client";
import {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "../validations/expense.validation";

export const createExpense = async (
  userId: number,
  data: CreateExpenseInput
) => {
  return prisma.expense.create({
    data: {
      userId,
      category: data.category,
      amount: data.amount,
      date: new Date(data.date),
      note: data.note,
    },
  });
};

export const getUserExpenses = async (userId: number) => {
  return prisma.expense.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const getExpenseById = async (userId: number, expenseId: number) => {
  const expense = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

export const updateExpense = async (
  userId: number,
  expenseId: number,
  data: UpdateExpenseInput
) => {
  await getExpenseById(userId, expenseId);

  return prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      category: data.category,
      amount: data.amount,
      date: data.date ? new Date(data.date) : undefined,
      note: data.note,
    },
  });
};

export const deleteExpense = async (userId: number, expenseId: number) => {
  await getExpenseById(userId, expenseId);

  return prisma.expense.delete({
    where: {
      id: expenseId,
    },
  });
};