<template>
  <ToastComponent></ToastComponent>
  <RouterView :key="qs.stringify(route.params)" />
</template>

<script setup lang="ts">
import ToastComponent from "@/components/ToastComponent.vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import qs from "qs";
import { watch, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { hasPermission } from "./helpers/PermissionHelper";
import i18n, { loadLocaleMessages, setI18nLanguage } from "./i18n";
import { useAuthStore } from "./stores/auth";
import { useSettingStore } from "./stores/setting";
import echo from "./og/echo";
import { useNotificationStore } from "@/stores/notifications";
import {
  NOTIFIABLE_TYPE_USER,
  NOTIFICATION_TYPE_BULKUPDATE,
  NOTIFICATION_TYPE_EXPORT,
  NOTIFICATION_TYPE_PROCESSING_EXPORT,
} from "@/enums/Notification";
import type { INotification } from "@/interfaces/Notification";
import type { IUser } from "@/interfaces/User";
const settingStore = useSettingStore();
const route = useRoute();
const { language } = storeToRefs(settingStore);

const changeLanguage = async () => {
  await loadLocaleMessages(i18n, language.value);
  setI18nLanguage(i18n, language.value);
};
changeLanguage();
watch(language, async () => {
  changeLanguage();
});

const notificationStore = useNotificationStore();
const { notifications, processingNotifications } =
  storeToRefs(notificationStore);
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
router.beforeResolve(async (to) => {


  if (to.meta.permissions && !hasPermission(to.meta.permissions)) {
    return {
      name: "AccessDenied",
      // Match the path of your current page and keep the same url...
      params: { pathMatch: to.path.split("/").slice(1) },
      // ...and the same query and hash.
      query: to.query,
      hash: to.hash,
    };
  }
});
</script>
