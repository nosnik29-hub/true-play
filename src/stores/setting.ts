import type { Language } from "@/interfaces/Translation";
import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

export const useSettingStore = defineStore("setting", () => {
  const language = ref((localStorage.getItem("language") ?? "en") as Language);
  const perPage = ref(
    localStorage.getItem("per_page")
      ? parseInt(localStorage.getItem("per_page")!)
      : 10
  );
  const languageList = ref([
    {
      name: "English",
      code: "en",
    },
    {
      name: "Chinese",
      code: "zh",
    },
    {
      name: "Thai",
      code: "th",
    },
    {
      name: "Indonesian",
      code: "id",
    },
    {
      name: "Vietnamese",
      code: "vi",
    },
  ]);

  onMounted(() => {
    document.documentElement.classList.add(language.value);
  });

  watch(language, (newLanguage, oldLanguage) => {
    localStorage.setItem("language", language.value);
    document.documentElement.classList.remove(oldLanguage);
    document.documentElement.classList.add(language.value);
  });
  watch(perPage, () => {
    localStorage.setItem("per_page", perPage.value.toString());
  });
  return {
    language,
    perPage,
    languageList,
  };
});
