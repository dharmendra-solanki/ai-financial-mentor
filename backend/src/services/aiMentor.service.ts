import Groq from "groq-sdk";
import prisma from "../prisma/prisma.client";
import type { AiChatInput } from "../validations/aiMentor.validation";
import { getDashboardSummary } from "./dashboard.service";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error("GROQ_API_KEY is not defined");
}

const groq = new Groq({
  apiKey: groqApiKey,
});

export const askAiMentor = async (userId: number, data: AiChatInput) => {
  const summary = await getDashboardSummary(userId);

  const prompt = `
You are an AI Financial Mentor. Give practical, simple, and safe personal finance advice.

User financial summary:
- Total income: ${summary.totalIncome}
- Total expense: ${summary.totalExpense}
- Balance: ${summary.balance}
- Current month income: ${summary.currentMonthIncome}
- Current month expense: ${summary.currentMonthExpense}
- Current month budget: ${summary.totalBudget}
- Budget used percentage: ${summary.budgetUsedPercentage}%

User question:
${data.question}

Rules:
- Do not guarantee investment returns.
- Do not give illegal tax advice.
- Keep the answer simple.
- Give actionable steps.
`;

  let answer = "";

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI financial mentor for budgeting, saving, debt planning, and financial discipline.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    answer =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate advice right now.";
  } catch (error) {
    console.log("AI Mentor Error:", error);

    answer =
      "AI service is currently unavailable. Based on your financial summary, track every expense, reduce non-essential spending, keep monthly expenses below income, set a fixed savings target, and review your budget weekly.";
  }

  const chat = await prisma.aiChat.create({
    data: {
      userId,
      question: data.question,
      answer,
    },
  });

  return chat;
};

export const getUserAiChats = async (userId: number) => {
  return prisma.aiChat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};