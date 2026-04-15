<template>
  <ModalComponent
    :modalTitle="translate('Question')"
    :open="open"
    @close="closeAllModals"
  >
    <div class="p-6 flex flex-col items-center justify-center w-full">
      <div class="flex items-center gap-x-4 mb-8">
        <i class="fas fa-question-circle text-[40px] text-[#FF4242]"></i>
        {{ translate("AreYouSure") }}
      </div>
      <section class="py-[10px] flex flex-row flex-nowrap gap-x-[20px]">
        <button
          class="btn btn-success"
          type="button"
          @click="callbackForConfirm"
        >
          {{ translate("Yes") }}
        </button>
        <button
          class="btn btn-default"
          type="button"
          @click="closeAllModals"
        >
          {{ translate("No") }}
        </button>
      </section>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { toRef } from "vue";
import ModalComponent from "./ModalComponent.vue";

const props = defineProps<{
  open: boolean;
}>();

const defaultOpen = toRef(props.open);

const emit = defineEmits(["close", "confirm"]);

const callbackForConfirm = () => {
  emit("confirm");
};

const closeAllModals = () => {
  emit("close");
};
</script>

<style scoped></style>
