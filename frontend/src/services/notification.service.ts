import api from "./api";

export interface AppNotification {
  type: string;
  title: string;
  message: string;
}

interface NotificationResponse {
  success: boolean;
  message: string;
  data: AppNotification[];
}

export const getNotifications = async (): Promise<AppNotification[]> => {
  const response = await api.get<NotificationResponse>("/api/notifications");
  return response.data.data;
};