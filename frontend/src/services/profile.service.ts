import api from "./api";
import type { ApiSingleResponse } from "../types/finance.types";

export interface Profile {
  id: number;
  userId: number;
  age?: number;
  occupation?: string;
  monthlyIncome?: string | number;
  currency: string;
  country?: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileInput {
  age?: number;
  occupation?: string;
  monthlyIncome?: number;
  currency?: string;
  country?: string;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
}

export const getProfile = async (): Promise<Profile | null> => {
  const response = await api.get<ApiSingleResponse<Profile | null>>(
    "/api/profile"
  );
  return response.data.data;
};

export const updateProfile = async (
  data: ProfileInput
): Promise<Profile> => {
  const response = await api.put<ApiSingleResponse<Profile>>(
    "/api/profile",
    data
  );
  return response.data.data;
};