import { z } from "zod";

export const profileValidation = z.object({
  age: z
    .number()
    .int("Age must be an integer")
    .min(1, "Age must be valid")
    .max(120, "Age must be valid")
    .optional(),

  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters long")
    .optional(),

  monthlyIncome: z
    .number()
    .positive("Monthly income must be greater than 0")
    .optional(),

  currency: z
    .string()
    .min(2, "Currency is required")
    .max(5, "Currency is too long")
    .optional(),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters long")
    .optional(),

  riskLevel: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
});

export type ProfileInput = z.infer<typeof profileValidation>;