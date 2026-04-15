import type { IMeta, IPagination } from "./ApiResponse";

export interface IStreamHistory {
	stream_date: Date,
	stream_start_time: string,
	stream_end_time: string,
	streamer_name: string,
	stream_key: string,
	viewers: number,
	comments: number,
	reactions: number,
	shares: number,
	tips: number,
	status: number,
	total_time: number,
}