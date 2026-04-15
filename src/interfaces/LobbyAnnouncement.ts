import type { IMeta, IPagination } from "./ApiResponse";
import type { IAnnouncementTranslation, ITranslation } from "./Translation";
export interface IAnnouncementList {
  id: number;
  title: ITranslation;
  image: ITranslation;
  content: ITranslation;
  start_date: Date;
  end_date: Date;
  is_enabled: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
export interface IAnnouncementListApiResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}
export interface IAnnouncementApiResponse<T> {
  data: T;
  meta: IMeta;
  details?: [];
}

export interface AnnouncementFormRequestInterface {
  id: number;
  title: IAnnouncementTranslation;
  banner: IAnnouncementTranslation;
  content: IAnnouncementTranslation;
  duration: string[];
  order: number;
}
