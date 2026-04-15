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
	stream_date: [],
	streamer_name: "",
	stream_time: "",
	avatar_urls: "",
	game_urls: "",
	status: 1,

});

const successMessage = translate("Success");
const errorMessage = translate("InternalError");

const createStreamer = () => {
  toastStore.addToast({
    type: "success",
    title: successMessage,
  });
  emits("onCreate")
};
const resetForm = () => {
	form.value.stream_date = [];
	form.value.streamer_name = "";
	form.value.stream_time = "";
	form.value.avatar_urls = "";
	form.value.game_urls = "";
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
    @submit.prevent="createStreamer"
  >
    <div class="container-grid pb-[20px]">
      <!-- Streamer Name-->
      <InputText
        id="streamer_name"
        :label="translate('StreamerName')"
        :placeholder="translate('StreamerNamePlaceholder')"
        :required="true"
        type="text"
      ></InputText>
     
			<!-- Stream Date -->
      <div class="form_inputs">
        <label>{{ translate("StreamDate") }} *</label>
        <DateRangePicker
          v-model="form.stream_date"
          :enable-time-picker="true"
          input-class-name="form-control"
          :locale="language"
          :placeholder="translate('StreamDatePlaceholder')"
        ></DateRangePicker>
      </div>

  		<!-- Stream Time -->
      <InputText
        id="stream_time"
        v-model="form.stream_time"
        :label="translate('StreamTime')"
        :placeholder="translate('StreamerNamePlaceholder')"
        :required="true"
        type="text"
      ></InputText>
      
			<!-- Avatar Link -->
      <InputText
        id="avatar_urls"
        v-model="form.avatar_urls"
        :label="translate('AvatarLink')"
        :placeholder="translate('AvatarLinkPlaceholder')"
        :required="true"
        type="text"
      ></InputText>
      
			<!-- Game Link -->
      <InputText
        id="game_urls"
        v-model="form.game_urls"
        :label="translate('GameLink')"
        :placeholder="translate('GameLinkPlaceholder')"
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
