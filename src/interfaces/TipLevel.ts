import type { IMeta, IPagination } from "./ApiResponse";

export interface ITipLevel {
  level_no: number;
  level_amount: number;
  privilege: string;
  status: number;
	create_at: Date;
}