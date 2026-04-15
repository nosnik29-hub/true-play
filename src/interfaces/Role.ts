import type { IMeta, IPagination } from "./ApiResponse";
import type { ITranslation } from "./Translation";
export interface IRoleList {
  id: number;
  role_name_translations: ITranslation;
  role_code: string;
  description_translations: ITranslation;
  permissions: Array<IPermission>;
}
export interface IRoleListApiResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}

export interface IRoleForm {
  id: number;
  role_name_translations: ITranslation;
  description_translations: ITranslation;
  is_enabled: number;
  permissions: Array<IPermission>;
}

export interface IPermission {
  id: number;
  permission_name_translations: ITranslation;
  children?: IPermission[];
}
