import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

export const hasPermission = (permission: string | string[]) => {
  const authStore = useAuthStore();

  const { user } = storeToRefs(authStore);
  return true
};
