<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-start px-4 py-6 sm:items-start sm:p-6 z-[1000] inline-table"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-start">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->

      <template
        v-for="(toast, key) in toasts"
        :key="key"
      >
        <transition
          enter-active-class="transform ease-out duration-300"
          enter-from-class="translate-y-0 opacity-0 sm:translate-y-0 sm:translate-x-0"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            :class="[
              'toast',
              toast.type === 'success' ? 'toast-success' : '',
              toast.type === 'error' ? 'toast-error' : '',
              toast.type === 'warning' ? 'toast-warning' : '',
              toast.type === 'info' ? 'toast-info' : '',
            ]"
          >
            <div class="toast-header">
              <h2 class="toast-header-title">
                {{ translate("OGAPIIntegration") }}
              </h2>
              <i
                class="fa fa-times text-[28px] cursor-pointer z-[9999]"
                @click="close(key)"
              ></i>
            </div>
            <div class="toast-body">
              <div class="toast-message">
                <i
                  :class="[
                    'fa',
                    toast.type === 'success' ? ' fa-check-circle' : '',
                    toast.type === 'error' ? ' fa-exclamation-circle' : '',
                  ]"
                ></i>
                <p v-if="toast.title">{{ translate(toast.title) }}</p>
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { useToastStore } from "@/stores/toasts";
import { storeToRefs } from "pinia";
const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

const close = (key: number) => {
  toastStore.deleteToast(key);
};
</script>
