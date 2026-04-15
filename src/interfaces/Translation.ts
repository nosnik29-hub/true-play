export type Language = "en" | "zh" | "th" | "id" | "vn";

export type ITranslation = {
  [key in Language]: any;
};

export type IAnnouncementTranslation = {
  [key in Language as string]: string;
};

export interface ISelectOptions {
  label: string;
  value: string | number | null;
}

export interface IMultiSelectOptions {
  label: string;
  value: string;
  hasJackpot?: boolean;
  type: string;
}

export interface ICustomSelectOptions {
  label: string;
  value: string | number | null;
  data: any;
}
export interface IMultiSelectOptionsForGame {
  label?: string;
  game_name_translations: ITranslation;
  value: string;
  hasJackpot?: boolean;
  type: string;
}

export interface ITransactionType {
  transaction_type: string;
  transaction_type_id: string | number | null;
  before_type_id: string | number | null;
}
