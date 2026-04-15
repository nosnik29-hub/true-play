<template>
  <Listbox
    v-model="language"
    as="div"
    class="select-container"
  >
    <div class="relative">
      <ListboxButton class="listbox-button listbox-button-sm lang-select">
        <span class="block truncate">
          <img
            alt=""
            :src="flagUrl(language)"
          />
        </span>
        <span class="listbox-button-span">
          <Icon icon="icon-park-solid:down-one" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="listbox-options lang-options">
          <ListboxOption
            v-for="lang in languageList"
            :key="lang.code"
            v-slot="{ active, selected }"
            as="template"
            :value="lang.code"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-black',
                'relative cursor-default select-none py-2 pl-2 pr-2 flex',
              ]"
            >
              <img
                alt=""
                class="w-[25px] mr-[5px]"
                :src="flagUrl(lang.code)"
              />
              <span
                :class="[selected ? 'font-semibold' : 'font-normal', 'block']"
              >
                {{ translate(lang.name) }}
              </span>
              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              ></span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { useSettingStore } from "@/stores/setting";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";

const flagUrl = (lang: string) => {
  return new URL(`../assets/img/flag-${lang}.png`, import.meta.url).href;
};

// const form = ref({ language: localStorage.getItem("language") ?? "en" } as {
//   [key: string]: any;
// });

const settingStore = useSettingStore();
const { language, languageList } = storeToRefs(settingStore);
</script>
