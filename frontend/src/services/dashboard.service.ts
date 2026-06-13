import api from "./api";
import type { ApiSingleResponse, DashboardSummary } from "../types/finance.types";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<ApiSingleResponse<DashboardSummary>>(
    "/api/dashboard/summary"
  );

  return response.data.data;
};