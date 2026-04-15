import type { IMeta, IPagination } from "./ApiResponse";
import type { ITranslation } from "./Translation";

export interface IUpcomingStream {
	stream_date: Date;
  stream_time: string;
	streamer_name: string;
	avatar_urls: ITranslation;
	game_image_urls: ITranslation;
  status: number;
  create_at: Date;
}