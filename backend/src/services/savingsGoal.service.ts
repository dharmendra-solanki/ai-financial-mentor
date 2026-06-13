import prisma from "../prisma/prisma.client";
import {
  CreateSavingsGoalInput,
  UpdateSavingsGoalInput,
} from "../validations/savingsGoal.validation";

export const createSavingsGoal = async (
  userId: number,
  data: CreateSavingsGoalInput
) => {
  return prisma.savingsGoal.create({
    data: {
      userId,
      title: data.title,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount || 0,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      note: data.note,
    },
  });
};

export const getUserSavingsGoals = async (userId: number) => {
  const goals = await prisma.savingsGoal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return goals.map((goal) => {
    const targetAmount = Number(goal.targetAmount);
    const currentAmount = Number(goal.currentAmount);

    return {
      ...goal,
      progressPercentage:
        targetAmount > 0
          ? Number(((currentAmount / targetAmount) * 100).toFixed(2))
          : 0,
      remainingAmount: targetAmount - currentAmount,
    };
  });
};

export const getSavingsGoalById = async (
  userId: number,
  goalId: number
) => {
  const goal = await prisma.savingsGoal.findFirst({
    where: {
      id: goalId,
      userId,
    },
  });

  if (!goal) {
    throw new Error("Savings goal not found");
  }

  return goal;
};

export const updateSavingsGoal = async (
  userId: number,
  goalId: number,
  data: UpdateSavingsGoalInput
) => {
  await getSavingsGoalById(userId, goalId);

  return prisma.savingsGoal.update({
    where: {
      id: goalId,
    },
    data: {
      title: data.title,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      note: data.note,
    },
  });
};

export const deleteSavingsGoal = async (
  userId: number,
  goalId: number
) => {
  await getSavingsGoalById(userId, goalId);

  return prisma.savingsGoal.delete({
    where: {
      id: goalId,
    },
  });
};