<script setup lang="ts">
import InputText from "@/components/InputText.vue";
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
    game_provider: "",
    game_name: "",
    streamer_name: "",
    streamer_image: "",
    nationality: "",
    rtp: "",
    bet_limit: "",
	status: 1,
});

const successMessage = translate("Success");
const errorMessage = translate("InternalError");

const createGame = () => {
  toastStore.addToast({
    type: "success",
    title: successMessage,
  });
  emits("onCreate")
};

const resetForm = () => {
  form.value.game_provider = "";
  form.value.game_name = "";
  form.value.streamer_name = "";
  form.value.streamer_image = "";
  form.value.nationality = "";
  form.value.rtp = "";
  form.value.bet_limit = "";
	form.value.status = 1;
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
    @submit.prevent="createGame"
  >
    <div class="container-grid pb-[20px]">
			<!-- Game Provider-->
      <InputText
        id="game_provider"
        v-model="form.game_provider"
        :label="translate('GameProvider')"
        :placeholder="translate('GameProviderPlaceholder')"
        :required="true"
        type="text"
      ></InputText>

			<!-- Streamer Name-->
      <InputText
        id="game_name"
        v-model="form.game_name"
        :label="translate('GameName')"
        :placeholder="translate('GameNamePlaceholder')"
        :required="true"
        type="text"
      ></InputText>

      <!-- Streamer Name-->
      <InputText
        id="streamer_name"
        v-model="form.streamer_name"
        :label="translate('StreamerName')"
        :placeholder="translate('StreamerNamePlaceholder')"
        :required="true"
        type="text"
      ></InputText>

			<!-- Streamer Image-->
      <InputText
        id="streamer_image"
        v-model="form.streamer_image"
        :label="translate('StreamerImage')"
        :placeholder="translate('StreamerImagePlaceholder')"
        :required="true"
        type="text"
      ></InputText>

  		<!-- Nationality -->
      <InputText
        id="nationality"
        v-model="form.nationality"
        :label="translate('Nationality')"
        :placeholder="translate('NationalityPlaceholder')"
        :required="true"
        type="text"
      ></InputText>
      
			<!-- Bet Limit -->
      <InputText
        id="bet_limit"
        v-model="form.bet_limit"
        :label="translate('BetLimit')"
        :placeholder="translate('BetLimitPlaceholder')"
        :required="true"
        type="text"
      ></InputText>
      
			<!-- RTP -->
      <InputText
        id="rtp"
        v-model="form.rtp"
        :label="translate('RTP')"
        :placeholder="translate('RTPPlaceholder')"
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
