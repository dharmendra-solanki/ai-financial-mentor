import prisma from "../prisma/prisma.client";
import {
  CreateIncomeInput,
  UpdateIncomeInput,
} from "../validations/income.validation";

export const createIncome = async (
  userId: number,
  data: CreateIncomeInput
) => {
  return prisma.income.create({
    data: {
      userId,
      source: data.source,
      amount: data.amount,
      date: new Date(data.date),
      note: data.note,
    },
  });
};

export const getUserIncomes = async (userId: number) => {
  return prisma.income.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const getIncomeById = async (userId: number, incomeId: number) => {
  const income = await prisma.income.findFirst({
    where: {
      id: incomeId,
      userId,
    },
  });

  if (!income) {
    throw new Error("Income not found");
  }

  return income;
};

export const updateIncome = async (
  userId: number,
  incomeId: number,
  data: UpdateIncomeInput
) => {
  await getIncomeById(userId, incomeId);

  return prisma.income.update({
    where: {
      id: incomeId,
    },
    data: {
      source: data.source,
      amount: data.amount,
      date: data.date ? new Date(data.date) : undefined,
      note: data.note,
    },
  });
};

export const deleteIncome = async (userId: number, incomeId: number) => {
  await getIncomeById(userId, incomeId);

  return prisma.income.delete({
    where: {
      id: incomeId,
    },
  });
};