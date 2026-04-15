import type { ITranslation } from "@/interfaces/Translation";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import i18n from "../i18n";

export const translate = (
  translation: ITranslation | string | null | undefined
) => {
  const { t } = i18n.global;
  const settingStore = useSettingStore();
  const { language } = storeToRefs(settingStore);

  if (translation === null || translation === undefined) {
    return "--";
  }
  if (typeof translation === "object") {
    return translation![language.value] ?? translation!["en"] ?? "--";
  }

  return t(translation);
};
