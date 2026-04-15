<style scoped>
.with-counter {
  display: block !important;
}
#app .notification-dropdown .dropdown-body button,
#app .notification-dropdown .dropdown-body a {
  height: auto !important;
}
#app .notification-dropdown .dropdown-body button div span,
#app .notification-dropdown .dropdown-body a div .details,
#app .notification-dropdown .dropdown-body button div .details {
  font-size: 12px;
  line-height: 14px;
  color: #989696;
}
.title-label{
  color:  #cac706;
  font-size: 30px;
  margin-left: 15px;
}
</style>
<template>
  <!--HEADER-->
  <header class="header_bar">
    <div class="card flex flex-row flex-nowrap items-center gap-x-4">
      <RouterLink
        class="!bg-transparent"
        to="/"
      >
        <label class="title-label">FOLLOW BET</label>
      </RouterLink>
      <div class="user-controls">
        <span class="text-[12px] whitespace-nowrap">(GMT-4)</span>
        <Menu
          as="div"
          class="relative inline-block text-left"
        >
          <div>
            <MenuButton
              id="bellBtn"
              class="notification"
            >
              <img
                alt=""
                src="@/assets/img/icon-bell.svg"
              />
              <template v-if="unreadCount > 0">
                <span class="animate-ping"></span>
                <span>{{ unreadCount }}</span>
              </template>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              id="notifBox"
              class="notifBox absolute right-0 z-10 mt-2 w-[350px] rounded-md bg-white translate-x-1/2 right-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="notification-dropdown">
                <div class="dropdown-top flex items-center justify-between">
                  <span class="notif_modal_title">
                    {{ translate("Notifications") }}
                  </span>
                  <button
                    class="mark_allRead"
                    @click="markAllNotificationAsRead"
                  >
                    {{ translate("MarkAllAsRead") }}
                  </button>
                </div>
                <p
                  v-if="notifications.length == 0"
                  class="text-center"
                >
                  {{ translate("ThereAreNoNotifications") }}
                </p>
                <div
                  v-else
                  id="notification-box"
                  class="dropdown-body divide-solid divide-y overflow-y-scroll max-h-[435px]"
                  @scroll="NotifonScroll"
                >
                  <MenuItem
                    v-for="notification in processingNotifications"
                    :key="notification.id"
                    class=""
                  >
                    <a
                      v-if="notification.type == NOTIFICATION_TYPE_EXPORT"
                      class="!min-h-[58px] block text-sm w-full"
                      :href="notification.data.url"
                      target="_self"
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-blue">
                        <i class="fa fa-file-alt"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                            <p
                              v-if="notification.data.date_range"
                              class="details"
                            >
                              {{ notification.data.date_range }}
                            </p>
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </a>
                    <button
                      v-else-if="
                        notification.type == NOTIFICATION_TYPE_PROCESSING_EXPORT
                      "
                      class="!min-h-[58px] block text-sm w-full"
                      @click="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-blue">
                        <i class="fa fa-file-alt"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                            <p
                              v-if="notification.data.date_range"
                              class="details"
                            >
                              {{ notification.data.date_range }}
                            </p>
                            <div class="flex !pl-0 !max-w-full">
                              <div
                                class="w-full bg-gray-200 rounded-full dark:bg-gray-700 !pl-0 !max-w-full"
                              >
                                <div
                                  class="bg-blue-600 h-[10px] rounded-full !max-w-full"
                                  :style="`width: ${notification.data.percent_completed}% !important`"
                                ></div>
                              </div>
                              <div class="flex-none">
                                {{
                                  Math.round(
                                    notification.data.percent_completed!
                                  )
                                }}%
                              </div>
                            </div>
                          </span>
                        </p>
                      </div>
                    </button>
                    <RouterLink
                      v-else-if="
                        notification.type == NOTIFICATION_TYPE_BULKUPDATE
                      "
                      class="!min-h-[58px] block text-sm w-full"
                      style="background: none !important"
                      to=""
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-green">
                        <i class="fa fa-user-tie"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </RouterLink>
                    <RouterLink
                      v-else
                      class="!min-h-[58px] block text-sm w-full"
                      style="background: none !important"
                      to=""
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-green">
                        <i class="fa fa-envelope"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{
                              translate(
                                notification.data.message.replace(
                                  "An email has been sent to the provided email addresses of",
                                  translate(
                                    "An email has been sent to the provided email addresses of"
                                  )
                                )
                              )
                            }}
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem
                    v-for="notification in notifications"
                    :key="notification.id"
                    class=""
                  >
                    <a
                      v-if="notification.type == NOTIFICATION_TYPE_EXPORT"
                      class="!min-h-[58px] block text-sm w-full"
                      :href="notification.data.url"
                      target="_self"
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-blue">
                        <i class="fa fa-file-alt"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                            <p
                              v-if="notification.data.date_range"
                              class="details"
                            >
                              {{ notification.data.date_range }}
                            </p>
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </a>
                    <button
                      v-else-if="
                        notification.type == NOTIFICATION_TYPE_PROCESSING_EXPORT
                      "
                      class="!min-h-[58px] block text-sm w-full"
                      @click="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-blue">
                        <i class="fa fa-file-alt"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                            <p
                              v-if="notification.data.date_range"
                              class="details"
                            >
                              {{ notification.data.date_range }}
                            </p>
                            <div class="flex !pl-0 !max-w-full">
                              <div
                                class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 !pl-0 !max-w-full"
                              >
                                <div
                                  class="bg-blue-600 h-2.5 rounded-full"
                                  :style="`width: ${notification.data.percent_completed}%`"
                                ></div>
                              </div>
                              <div class="flex-none">
                                {{
                                  Math.round(
                                    notification.data.percent_completed!
                                  )
                                }}%
                              </div>
                            </div>
                          </span>
                        </p>
                      </div>
                    </button>
                    <RouterLink
                      v-else-if="
                        notification.type == NOTIFICATION_TYPE_BULKUPDATE
                      "
                      class="!min-h-[58px] block text-sm w-full"
                      style="background: none !important"
                      to=""
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-green">
                        <i class="fa fa-user-tie"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{ translate(notification.data.message) }}
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </RouterLink>
                    <RouterLink
                      v-else
                      class="!min-h-[58px] block text-sm w-full"
                      style="background: none !important"
                      to=""
                      @focus="readNotif(notification.id)"
                    >
                      <span class="notification-icon notification-icon-green">
                        <i class="fa fa-envelope"></i>
                      </span>
                      <div>
                        <p>
                          <span
                            :class="[
                              'overflow-hidden text-ellipsis',
                              notification.read_at === null
                                ? 'font-bold !text-black'
                                : 'font-thin !text-gray-400',
                            ]"
                          >
                            {{
                              translate(
                                notification.data.message.replace(
                                  "An email has been sent to the provided email addresses of",
                                  translate(
                                    "An email has been sent to the provided email addresses of"
                                  )
                                )
                              )
                            }}
                          </span>
                        </p>
                        <p
                          :class="[
                            'block',
                            notification.read_at === null
                              ? 'font-thin !text-black'
                              : 'font-thin !text-gray-400',
                          ]"
                        >
                          {{ dateDiffForHumans(notification.created_at) }}
                        </p>
                      </div>
                    </RouterLink>
                  </MenuItem>
                  <div
                    class="flex h-[50px] items-center justify-center"
                    w-full
                  >
                    <i
                      v-if="isProcessing"
                      class="fas fa-spinner fa-pulse"
                    ></i>
                  </div>
                </div>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <LanguageSwitcher />
        <RouterLink
          active-class=""
          class="current-user inline-flex flex-nowrap items-center gap-x-[20px]"
          exact-active-class=""
          :to="{ name: 'profile.general' }"
        >
          <span class="font-bold text-[18px]">{{ user.username }}</span>
          <div class="user-pic !w-[54px] !h-[54px]">
            <img src="@/assets/img/user-pic.png" />
          </div>
        </RouterLink>
        <button
          class="logout-btn"
          @click="logout"
        >
          <img src="@/assets/img/logout.svg" />
        </button>
        <i
          class="hamburger fa fa-bars"
          @click="menutoggler"
        ></i>
      </div>
    </div>
  </header>
  <!--PAGE BODY with sideNav-->
  <main class="page-container">
    <aside
      class="sidebar toFixed"
      :class="menutoggle ? 'expanded' : ''"
    >
      <!-- <div class="card">
        <div class="user">
          <div class="user-pic">
            <img src="@/assets/img/user-pic.png" />
          </div>
          <span class="user-role font-bold text-[18px]">
            {{ translate(user.role.role_name_translations) }}
          </span>
          <div class="user-last-login">
            <span>{{ translate("LastLogin") }}:</span>
            <span>{{ dateOnlyFormat(user.last_login_at) }}</span>
          </div>
        </div>
      </div> -->

      <NavBar @close="doSomething"></NavBar>
    </aside>

    <!--RouterView Page Content-->
    <div
      class="main-container"
      :class="route.name !== 'home' ? '' : 'home-main-container'"
    >
      <RouterView />
    </div>
  </main>

  <!--Footer Content-->
  <footer class="footer">
    
    <span class="ml-auto">{{ appVersion }}</span>
  </footer>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import {
  NOTIFIABLE_TYPE_USER,
  NOTIFICATION_TYPE_BULKUPDATE,
  NOTIFICATION_TYPE_EXPORT,
  NOTIFICATION_TYPE_PROCESSING_EXPORT,
} from "@/enums/Notification";
import { dateDiffForHumans, dateOnlyFormat } from "@/helpers/DateHelper";
import { translate } from "@/helpers/TranslationHelper";

import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notifications";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import NavBar from "./NavBar/NavBar.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const route = useRoute();

const logout = () => {
};

const menutoggle = ref(false);

const menutoggler = () => {
  menutoggle.value = !menutoggle.value;
};

const isProcessing = ref(false);
const currentPage = ref(1);

const NotifStore = useNotificationStore();

const NotifonScroll = ({
  target: { scrollTop, clientHeight, scrollHeight },
}: any) => {
  if (scrollTop + clientHeight >= scrollHeight - 20 && !isProcessing.value) {
    isProcessing.value = true;
    currentPage.value++;

    NotifStore.fetch(currentPage.value)
      .then(() => {})
      .finally(() => {
        isProcessing.value = false;
      });
  }
};

const handleWindowSizeChange = () => {
  if (window.innerWidth <= 1024) {
    menutoggle.value = true;
  }
  menutoggle.value = false;
};

defineEmits(["custom-event"]);

const doSomething = () => {
  menutoggle.value = false;
};

onMounted(() => {
  window.addEventListener("resize", handleWindowSizeChange);
  handleWindowSizeChange();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleWindowSizeChange);
});

const notificationStore = useNotificationStore();
const { notifications, unreadCount, processingNotifications } =
  storeToRefs(notificationStore);
console.log(notifications);
const markAllNotificationAsRead = () => {
};

const notifIDsArray = ref({} as any);

const appVersion = import.meta.env.VITE_APP_VERSION;

const readNotif = (notifIDS: any) => {
  
};
</script>
