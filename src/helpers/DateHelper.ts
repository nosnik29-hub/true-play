import { useSettingStore } from "@/stores/setting";
import moment from "moment";
import "moment/dist/locale/en-gb";
import "moment/dist/locale/zh-cn";
import { storeToRefs } from "pinia";
import momentTz from 'moment-timezone';


export const dateFormat = (date: Date) => {

  if (!date || !moment(date).isValid()) {
    return '--';
  }
  
  return moment(date).format("YYYY/MM/DD HH:mm:ss");
};

export const dateOnlyFormat = (date: Date) => {
  return moment(date).format("YYYY/MM/DD");
};

export const dateFormatForMysql = (date: Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const dateDiffForHumans = (date: Date) => {
  moment.locale(getMomentLocale());
  return moment(date).fromNow();
};

export const dateFormatFullMonth = (date: Date) => {
  moment.locale(getMomentLocale());
  return moment(date).format("MMMM D, YYYY");
};

export const timeFormat = (date: Date) => {
  return moment(date).format("HH:mm");
};

const getMomentLocale = () => {
  const settingStore = useSettingStore();
  const { language } = storeToRefs(settingStore);

  let locale = "";

  switch (language.value) {
    case "en":
      locale = "en-gb";
      break;
    case "zh":
      locale = "zh-cn";
      break;
    default:
      locale = "en-gb";
      break;
  }
  return locale;
};

export const getDateTimeByTimezone = (timezone: string = 'America/La_Paz') => {

  return moment.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  
};
