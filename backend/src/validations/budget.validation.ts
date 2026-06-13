import { z } from "zod";

export const createBudgetValidation = z.object({
  category: z
    .string()
    .min(2, "Budget category must be at least 2 characters long"),

  limitAmount: z
    .number()
    .positive("Limit amount must be greater than 0"),

  month: z
    .number()
    .int("Month must be an integer")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),

  year: z
    .number()
    .int("Year must be an integer")
    .min(2000, "Year must be valid"),
});

export const updateBudgetValidation = z.object({
  category: z
    .string()
    .min(2, "Budget category must be at least 2 characters long")
    .optional(),

  limitAmount: z
    .number()
    .positive("Limit amount must be greater than 0")
    .optional(),

  month: z
    .number()
    .int("Month must be an integer")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12")
    .optional(),

  year: z
    .number()
    .int("Year must be an integer")
    .min(2000, "Year must be valid")
    .optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetValidation>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetValidation>;