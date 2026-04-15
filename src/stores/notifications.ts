// import { ref, computed } from 'vue';
import type { IApiResponse, IPagination } from "@/interfaces/ApiResponse";
import type { INotification } from "@/interfaces/Notification";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref([] as INotification[]);
  const processingNotifications = ref([] as INotification[]);
  const pagination = ref({} as IPagination);

  const fetch = (page: number = 1) => {
    const promise: Promise<IApiResponse<INotification[]>> = new Promise(
      (resolve, reject) => {
        axios
          .get<IApiResponse<INotification[]>>("/notification", {
            params: { page: page },
          })
          .then(({ data }) => {
            if (page === 1) {
              notifications.value = data.data;
            } else {
              notifications.value.push(...data.data);
            }
            pagination.value.current_page = page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response?.data?.meta !== undefined) {
              reject(error.response?.data?.meta);
            } else {
              reject(error);
            }
          });
      }
    );
    return promise;
  };

  const unreadCount = computed(
    () => notifications.value.filter((unread) => unread.read_at === null).length
  );

  return { fetch, notifications, unreadCount, processingNotifications };
});
