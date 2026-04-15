import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
// import { useSettingStore } from "@/stores/setting";
// import { storeToRefs } from "pinia";

const messages = {};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") ?? "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export function setI18nLanguage(i18n: any, locale: string) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }

  // * axios.defaults.headers.common['Accept-Language'] = locale // TODO: for axios
}

export async function loadLocaleMessages(i18n: any, locale: string) {
  try {
    // load locale messages with dynamic import
    const messages = await import(
      /* webpackChunkName: "locale-[request]" */ `./translations/${locale}.json`
    );

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default);
  } catch (error) {
    // load english translation if locale json doesn't exist
    const messages = await import(
      /* webpackChunkName: "locale-[request]" */ `./translations/en.json`
    );

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default);
  }

  return nextTick();
}

export default i18n;
