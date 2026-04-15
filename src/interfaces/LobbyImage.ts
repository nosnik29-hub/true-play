import type { IMeta, IPagination } from "./ApiResponse";
export interface IImageList {
  id: number;
  section_code: string;
  description: string;
  image_info: [];
  extra: [];
  is_enabled: number;
  created_at: string;
  updated_at: string;
}
export interface IImageListApiResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}
export interface IImageApiResponse<T> {
  data: T;
  meta: IMeta;
  details?: [];
}

export interface ImageFormRequestInterface {
  id: number;
  section_code: string;
  description: string;
  image_info: {
    en: [];
    zh: [];
  };
  extra: [];
}

export interface ImageInfoRequestInterface {
  id: number;
  name: string;
  size: string;
  image: string;
  language: string;
  details: [];
}
