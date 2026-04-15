import type { IMeta, IPagination } from "./ApiResponse";

export interface IPopular {
  stream_time: string;
  streamer_name: string;
  streamer_image: string;
  nationality: string;
	rtp: string;
  status: number;
	create_at: Date;
}