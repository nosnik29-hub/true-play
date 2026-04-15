// import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { ref } from "vue";

interface Toast {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export const useToastStore = defineStore("toasts", () => {
  const toasts = ref({} as { [key: number]: Toast });
  const addToast = (toast: Toast) => {
    const duration = toast.duration ?? 5;

    const key: number = Date.now();

    toasts.value = { ...toasts.value, [key]: toast };
    // toasts.value = [...toasts.value, toast];
    if (toast.duration != -1) {
      setTimeout(() => {
        // toasts.value = toasts.value.reduce(()
        delete toasts.value[key];
      }, duration * 1000);
    }
  };

  const deleteToast = (key: number) => {
    delete toasts.value[key];
  };

  return { toasts, addToast, deleteToast };
});
