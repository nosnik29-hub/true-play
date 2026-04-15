export interface INotification {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: IExportNotificationData;
  read_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IExportNotificationData {
  message: string;
  url: string;
  path: string;
  date_range?: string;
  download_time?: string;
  percent_completed?: number;
  notification_code?: string;
}
