import { z } from "zod";

export const aiChatValidation = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters long")
    .max(1000, "Question must not exceed 1000 characters"),
});

export type AiChatInput = z.infer<typeof aiChatValidation>;