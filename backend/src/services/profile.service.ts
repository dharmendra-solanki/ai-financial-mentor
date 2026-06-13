import prisma from "../prisma/prisma.client";
import { ProfileInput } from "../validations/profile.validation";

export const getUserProfile = async (userId: number) => {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};

export const upsertUserProfile = async (
  userId: number,
  data: ProfileInput
) => {
  return prisma.profile.upsert({
    where: {
      userId,
    },
    update: {
      age: data.age,
      occupation: data.occupation,
      monthlyIncome: data.monthlyIncome,
      currency: data.currency,
      country: data.country,
      riskLevel: data.riskLevel,
    },
    create: {
      userId,
      age: data.age,
      occupation: data.occupation,
      monthlyIncome: data.monthlyIncome,
      currency: data.currency,
      country: data.country,
      riskLevel: data.riskLevel,
    },
  });
};