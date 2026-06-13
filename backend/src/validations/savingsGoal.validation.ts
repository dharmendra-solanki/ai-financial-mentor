import { z } from "zod";

export const createSavingsGoalValidation = z.object({
  title: z
    .string()
    .min(2, "Goal title must be at least 2 characters long"),

  targetAmount: z
    .number()
    .positive("Target amount must be greater than 0"),

  currentAmount: z
    .number()
    .min(0, "Current amount cannot be negative")
    .optional(),

  deadline: z
    .string()
    .optional(),

  note: z
    .string()
    .optional(),
});

export const updateSavingsGoalValidation = z.object({
  title: z
    .string()
    .min(2, "Goal title must be at least 2 characters long")
    .optional(),

  targetAmount: z
    .number()
    .positive("Target amount must be greater than 0")
    .optional(),

  currentAmount: z
    .number()
    .min(0, "Current amount cannot be negative")
    .optional(),

  deadline: z
    .string()
    .optional(),

  note: z
    .string()
    .optional(),
});

export type CreateSavingsGoalInput = z.infer<
  typeof createSavingsGoalValidation
>;

export type UpdateSavingsGoalInput = z.infer<
  typeof updateSavingsGoalValidation
>;