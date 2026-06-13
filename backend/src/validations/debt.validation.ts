import { z } from "zod";

export const createDebtValidation = z.object({
  lenderName: z
    .string()
    .min(2, "Lender name must be at least 2 characters long"),

  totalAmount: z
    .number()
    .positive("Total amount must be greater than 0"),

  remainingAmount: z
    .number()
    .min(0, "Remaining amount cannot be negative"),

  emiAmount: z
    .number()
    .positive("EMI amount must be greater than 0"),

  interestRate: z
    .number()
    .min(0, "Interest rate cannot be negative")
    .optional(),

  dueDate: z
    .string()
    .optional(),

  note: z
    .string()
    .optional(),
});

export const updateDebtValidation = z.object({
  lenderName: z
    .string()
    .min(2, "Lender name must be at least 2 characters long")
    .optional(),

  totalAmount: z
    .number()
    .positive("Total amount must be greater than 0")
    .optional(),

  remainingAmount: z
    .number()
    .min(0, "Remaining amount cannot be negative")
    .optional(),

  emiAmount: z
    .number()
    .positive("EMI amount must be greater than 0")
    .optional(),

  interestRate: z
    .number()
    .min(0, "Interest rate cannot be negative")
    .optional(),

  dueDate: z
    .string()
    .optional(),

  note: z
    .string()
    .optional(),
});

export type CreateDebtInput = z.infer<typeof createDebtValidation>;
export type UpdateDebtInput = z.infer<typeof updateDebtValidation>;