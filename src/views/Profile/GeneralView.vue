<script setup lang="ts">
import ConfirmModal from "@/components/ConfirmModal.vue";
import DropdownComponent from "@/components/DropdownComponent.vue";
import InputText from "@/components/InputText.vue";
import { translate } from "@/helpers/TranslationHelper";
import { useAuthStore } from "@/stores/auth";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const toastStore = useToastStore();

const settingStore = useSettingStore();
const { languageList } = storeToRefs(settingStore);
const informationMessage = translate("NoChangesMade");
const isConfirmModalOpen = ref(false);
const iconUrl = (icon: string) => {
  return new URL(`../../assets/img/flag-${icon}.png`, import.meta.url).href;
};

const languageOptions = [
  {
    value: "en",
    label: "English",
    cardImage: iconUrl("en"),
  },
  {
    value: "zh",
    label: "SimplifiedChinese",
    cardImage: iconUrl("zh"),
  },
  {
    value: "th",
    label: "Thai",
    cardImage: iconUrl("th"),
  },
  {
    value: "id",
    label: "Indonesian",
    cardImage: iconUrl("id"),
  },
  {
    value: "vn",
    label: "Vietnamese",
    cardImage: iconUrl("vn"),
  },
];

const form = ref({
  full_name: "test",
  language: "en",
});

const initUpdate = () => {
};

const updateGeneralProfile = () => {

};
</script>

<template>
  <ConfirmModal
    :open="isConfirmModalOpen"
    @close="isConfirmModalOpen = false"
    @confirm="updateGeneralProfile()"
  ></ConfirmModal>
  <div>
    <form @submit.prevent="initUpdate">
      <div
        class="mt-4 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-4 pb-[10px] sm:w-full md:w-full lg:w-1/2 xl:w-1/3"
      >
        <div class="mb-2">
          <InputText
            id="full_name"
            v-model="form.full_name"
            :label="translate('FullName')"
            :placeholder="translate('FullNamePlaceholder')"
            :required="true"
            type="text"
          ></InputText>
        </div>

        <div class="form_inputs">
          <label>{{ translate("Language") }}</label>
          <DropdownComponent
            v-model="form.language"
            class="mb-2"
            :options="
              languageList.map((option: any) => ({
                label: option.name,
                value: option.code,
              }))
            "
            :placeholder="translate('LanguageSelectPlaceholder')"
          >
            <template v-slot:option="option">
              <div class="flex flex-row flex-nowrap gap-x-3 items-center">
                <div
                  class="overflow-hidden w-[25px] h-[25px] rounded-full my-1"
                >
                  <img
                    class="h-[25px]"
                    :src="iconUrl(option.value)"
                  />
                </div>
                {{ option.label }}
              </div>
            </template>
            <template v-slot:optionLabel="option">
              <span class="inline-flex items-baseline gap-x-3">
                <img
                  class="self-center w-[25px] h-[25px] rounded-full"
                  :src="iconUrl(option.value)"
                />
                <span>{{ option.label }}</span>
              </span>
            </template>
          </DropdownComponent>
        </div>
      </div>
      <section class="flex flex-row flex-nowrap gap-x-[20px]">
        <button
          class="btn btn-success"
          type="submit"
        >
          {{ translate("Update") }}
        </button>
      </section>
    </form>
  </div>
</template>
