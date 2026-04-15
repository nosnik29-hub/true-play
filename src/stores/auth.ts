import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/interfaces/User";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as IUser);

  return { user };
});
