<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import UploadImagePromoComponent from "@/components/Promo/UploadImagePromoComponent.vue";
import { translate } from "@/helpers/TranslationHelper";
import type { IApiResponse } from "@/interfaces/ApiResponse";
import { useToastStore } from "@/stores/toasts";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const emits = defineEmits(["onCreate", "cancel"]);
const toastStore = useToastStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const form = ref({
	sticker_name: "",
	image: "",
	amount: "",
	status: 1,
});

const successMessage = translate("Success");
const errorMessage = translate("InternalError");

const createVendor = () => {

};

const resetForm = () => {
  form.value.sticker_name = "";
  form.value.image = "";
  form.value.amount = "";
	form.value.status = 1;
};

const cancel = () => {
  resetForm();
  emits("cancel");
};

defineExpose({
  resetForm,
});
</script>

<template>
  <form
    class="p-[20px] w-full overflow-y-auto"
    @submit.prevent="createVendor"
  >
    <div class="container-grid pb-[20px]">
			<!-- Stiker Name-->
      <InputText
        id="sticker_name"
        v-model="form.sticker_name"
        :label="translate('StickerName')"
        :placeholder="translate('StickerNamePlaceholder')"
        :required="true"
        type="text"
      ></InputText>

			<!-- Image -->
      <UploadImagePromoComponent
        v-model="form.image"
        :required="true"
        title="Image"
      />

      <!-- Amount -->
      <InputText
        id="amount"
        v-model="form.amount"
        :label="translate('Amount')"
        :placeholder="translate('AmountPlaceholder')"
        :required="true"
        type="text"
      ></InputText>

			<!-- Status -->
      <div>
        <label>{{ translate("Status") }} *</label>
        <div class="form-control !h-[36px] !flex items-center !justify-between">
          <label>
            {{
              form.status == 1
                ? translate("Activated")
                : translate("Deactivated")
            }}
          </label>
          <div class="checkbox-custom">
            <input
              v-model="form.status"
              false-value="0"
              true-value="1"
              type="checkbox"
            />
            <span class="checkbox-style"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left mt-[10px]">
      <label class="red text-[12px]">* {{ translate("RequiredFields") }}</label>
    </div>
    <section class="py-[10px] flex flex-row flex-nowrap gap-x-[20px]">
      <button
        class="btn btn-success"
        type="submit"
      >
        {{ translate("Save") }}
      </button>
      <button
        class="btn btn-light"
        type="reset"
        @click="cancel"
      >
        {{ translate("Cancel") }}
      </button>
    </section>
  </form>
</template>
