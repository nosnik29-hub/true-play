export interface IMeta {
  code: number;
  message: string;
  error_details?: { [key: string]: string[] };
}

export interface IMeta2 {
  pagination: IPagination;
  code: number;
  message: string;
  error_details?: { [key: string]: string[] };
}

export interface IPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface IApiResponse<T> {
  data: T;
  meta: IMeta;
  details?: [];
}

export interface IApiPaginatedResponse<T> {
  data: T;
  meta: IMeta;
  pagination: IPagination;
  details?: [];
}

export interface IApiResponseMetaOnly {
  meta: IMeta;
}

export interface IPaginatedSearchParameters {
  per_page?: number;
  filter?: any;
  order_by?: any;
  page: number;
}
