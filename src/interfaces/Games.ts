import type { IMeta, IPagination } from "./ApiResponse";

export interface IGames {
  game_provider: string;
  stream_time: string;
  streamer_name: string;
  streamer_image: string;
  nationality: string;
	rtp: string;
	bet_limit: string;
  status: number;
}