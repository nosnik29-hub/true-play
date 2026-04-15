<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { translate } from "@/helpers/TranslationHelper";
import { useToastStore } from "@/stores/toasts";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const emits = defineEmits(["onCreate", "cancel"]);
const toastStore = useToastStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const form = ref({
	level_no: "",
	level_amount: "",
	privilege: "",
	status: 1,
});

const successMessage = translate("Success");
const errorMessage = translate("InternalError");

const createTipLevel = () => {
  toastStore.addToast({
    type: "success",
    title: successMessage,
  });
  emits("onCreate")
};

const resetForm = () => {
  form.value.level_no = "";
  form.value.level_amount = "";
  form.value.privilege = "";
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
    @submit.prevent="createTipLevel"
  >
    <div class="container-grid pb-[20px]">
			<!-- Level # -->
      <InputText
        id="level_no"
        v-model="form.level_no"
        :label="translate('LevelNo')"
        :placeholder="translate('LevelNoPlaceholder')"
        :required="true"
        type="text"
      ></InputText>

			<!-- Level Amount  -->
      <InputText
        id="level_amount"
        v-model="form.level_amount"
        :label="translate('LevelAmount')"
        :placeholder="translate('LevelAmountPlaceholder')"
        :required="true"
        type="text"
      ></InputText>

      <!-- Privilege  -->
      <InputText
        id="privilege"
        v-model="form.privilege"
        :label="translate('Privilege')"
        :placeholder="translate('PrivilegePlaceholder')"
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
