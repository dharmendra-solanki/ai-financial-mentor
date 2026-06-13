import { z } from "zod";

export const createExpenseValidation = z.object({
  category: z
    .string()
    .min(2, "Expense category must be at least 2 characters long"),

  amount: z
    .number()
    .positive("Amount must be greater than 0"),

  date: z
    .string()
    .min(1, "Date is required"),

  note: z
    .string()
    .optional(),
});

export const updateExpenseValidation = z.object({
  category: z
    .string()
    .min(2, "Expense category must be at least 2 characters long")
    .optional(),

  amount: z
    .number()
    .positive("Amount must be greater than 0")
    .optional(),

  date: z
    .string()
    .min(1, "Date is required")
    .optional(),

  note: z
    .string()
    .optional(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseValidation>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseValidation>;