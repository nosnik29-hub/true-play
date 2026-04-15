import type { IMeta, IPagination } from "./ApiResponse";
import type { ITranslation, Language } from "./Translation";
// export interface IClient {
//   username: string;
//   full_name: string;
//   token?: string;
//   wallet_balance_amount: number;
//   client_level: {
//     client_level_id: number;
//     client_level_name_translation: ITranslation;
//   };
//   created_at: Date;
//   email: string;
//   contact_number: string;
//   margins: IMargin[];
//   betting_status: boolean;
// }

export interface IToken {
  token: string;
}

export interface IUser {
  id: number;
  full_name: string;
  username: string;
  owner: string;
  email: string;
  role: IRole;
  last_login_at: Date;
  created_at: Date;
  updated_at: Date;
  language: Language;
  is_enabled: boolean;
  owner_id?: number;
}

export interface IRole {
  id: string;
  role_name_translations: ITranslation;
  role_code: string;
  description_translations: ITranslation;
  permissions?: [];
}

export interface IUserListApiResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}

export interface IPassword {
  password: string;
}
