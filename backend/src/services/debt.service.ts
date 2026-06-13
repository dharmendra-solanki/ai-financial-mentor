import prisma from "../prisma/prisma.client";
import {
  CreateDebtInput,
  UpdateDebtInput,
} from "../validations/debt.validation";

export const createDebt = async (
  userId: number,
  data: CreateDebtInput
) => {
  return prisma.debt.create({
    data: {
      userId,
      lenderName: data.lenderName,
      totalAmount: data.totalAmount,
      remainingAmount: data.remainingAmount,
      emiAmount: data.emiAmount,
      interestRate: data.interestRate,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      note: data.note,
    },
  });
};

export const getUserDebts = async (userId: number) => {
  const debts = await prisma.debt.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return debts.map((debt) => {
    const totalAmount = Number(debt.totalAmount);
    const remainingAmount = Number(debt.remainingAmount);
    const paidAmount = totalAmount - remainingAmount;

    return {
      ...debt,
      paidAmount,
      progressPercentage:
        totalAmount > 0
          ? Number(((paidAmount / totalAmount) * 100).toFixed(2))
          : 0,
    };
  });
};

export const getDebtById = async (userId: number, debtId: number) => {
  const debt = await prisma.debt.findFirst({
    where: {
      id: debtId,
      userId,
    },
  });

  if (!debt) {
    throw new Error("Debt not found");
  }

  return debt;
};

export const updateDebt = async (
  userId: number,
  debtId: number,
  data: UpdateDebtInput
) => {
  await getDebtById(userId, debtId);

  return prisma.debt.update({
    where: {
      id: debtId,
    },
    data: {
      lenderName: data.lenderName,
      totalAmount: data.totalAmount,
      remainingAmount: data.remainingAmount,
      emiAmount: data.emiAmount,
      interestRate: data.interestRate,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      note: data.note,
    },
  });
};

export const deleteDebt = async (userId: number, debtId: number) => {
  await getDebtById(userId, debtId);

  return prisma.debt.delete({
    where: {
      id: debtId,
    },
  });
};