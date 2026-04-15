import type { IMeta, IPagination } from "./ApiResponse";

export interface IToken {
  token: string;
}

export interface IAuditLog {
  id: number;
  activity: string;
  referrer_url: string;
  api_url: string;
  user_agent: string;
  ip: string;
  payload: string;
  reason: string;
  is_success: boolean;
  user_id: number;
  create_at: Date;
  user: IUser;
  owner: string;
}

export interface IAuditLogsListApiResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}

export interface IUser {
  id: number | null;
  full_name: string | null;
  username: string | null;
  role: IRole;
}

export interface IRole {
  id: number | null;
  role_name_translations: ITranslation | null;
  role_code: string | null;
}

export interface ITranslation {
  en: string;
  zh: string;
}
