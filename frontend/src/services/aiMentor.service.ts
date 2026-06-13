import api from "./api";
import type { ApiListResponse, ApiSingleResponse } from "../types/finance.types";

export interface AiChat {
  id: number;
  userId: number;
  question: string;
  answer: string;
  createdAt: string;
}

export const askAiMentor = async (question: string): Promise<AiChat> => {
  const response = await api.post<ApiSingleResponse<AiChat>>("/api/ai/chat", {
    question,
  });

  return response.data.data;
};

export const getAiChats = async (): Promise<AiChat[]> => {
  const response = await api.get<ApiListResponse<AiChat>>("/api/ai/chats");
  return response.data.data;
};