import { z } from "zod";

export const createIncomeValidation = z.object({
  source: z
    .string()
    .min(2, "Income source must be at least 2 characters long"),

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

export const updateIncomeValidation = z.object({
  source: z
    .string()
    .min(2, "Income source must be at least 2 characters long")
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

export type CreateIncomeInput = z.infer<typeof createIncomeValidation>;
export type UpdateIncomeInput = z.infer<typeof updateIncomeValidation>;