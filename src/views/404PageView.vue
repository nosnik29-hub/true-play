<template>
  <!--HEADER-->
  <header class="header_bar">
    <div class="card flex flex-row flex-nowrap items-center gap-x-4">
      <RouterLink
        class="!bg-transparent"
        to="/"
      >
        <img
          class="w-[77px]"
          src="@/assets/img/OGlogo.png"
        />
      </RouterLink>
      <div class="user-controls">
        <span class="text-[12px] whitespace-nowrap">(GMT-4)</span>
        <Menu
          v-if="Object.keys(user).length !== 0"
          as="div"
          class="relative inline-block text-left"
        >
          <div>
            <MenuButton class="notification">
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
              class="absolute right-0 z-10 mt-2 w-[350px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  class="dropdown-body divide-solid divide-y overflow-y-auto max-h-[625px]"
                >
                  <MenuItem
                    v-for="notification in notifications"
                    :key="notification.id"
                  >
                    <a
                      v-if="notification.type == NOTIFICATION_TYPE_EXPORT"
                      class="block text-sm w-full"
                      :href="notification.data.url"
                      target="_blank"
                    >
                      <span class="notification-icon notification-icon-blue">
                        <i class="fa fa-file-alt"></i>
                      </span>
                      <div>
                        <div class="with-counter">
                          <p
                            :class="
                              notification.read_at === null ? 'font-bold' : ''
                            "
                          >
                            {{ translate(notification.data.message) }}
                          </p>
                        </div>
                        <span>
                          {{ moment(notification.created_at).fromNow() }}
                        </span>
                      </div>
                    </a>
                  </MenuItem>
                </div>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <LanguageSwitcher />
        <RouterLink
          v-if="Object.keys(user).length !== 0"
          active-class=""
          class="current-user inline-flex flex-nowrap items-center gap-x-[20px]"
          exact-active-class=""
          :to="{ name: 'profile' }"
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
          <img
            v-if="Object.keys(user).length !== 0"
            src="@/assets/img/logout.svg"
          />
          <img
            v-else
            src="@/assets/img/login.svg"
            style="filter: invert(100%); width: 16px"
          />
        </button>
      </div>
    </div>
  </header>
  <!--PAGE BODY with sideNav-->
  <main class="page-container">
    <!--RouterView Page Content-->
    <div
      class="main404-container"
      :style="{ 'background-image': 'url(' + icon('home_bg.jpg') + ')' }"
    >
      <div class="content404-wrap">
        <!--404 Message-->
        <div class="welcome404-section flex justify-end">
          <h1
            class="flex flex-row flex-wrap item-start justify-start sm:items-center"
          >
            <span class="welcome404">
              {{ translate("PageNotFound") }}
            </span>
            <span class="pagenotfoundtext text-[45px] whitespace-wrap">
              {{ translate("Page404NotFound") }}
            </span>
          </h1>
          <p>
            {{ translate("Page404Message") }}
          </p>

          <RouterLink
            class="flex btn btn-primary gap-3 items-center"
            :to="{ name: 'home' }"
          >
            <i class="fa fa-caret-right"></i>
            {{ translate("BackToHome") }}
          </RouterLink>
        </div>
        <!--Menu blocks Navigation-->
      </div>
    </div>
  </main>

  <!--Footer Content-->
  <footer class="footer">
    <img
      class="h-[44px]"
      src="@/assets/img/OGlogo.png"
    />
    <span>
      &copy;
      <b>2023 OGAPI.</b>
      {{ translate("AllRightsReserved") }}
    </span>
    <span class="ml-auto">{{ translate("AppVersion") }}</span>
  </footer>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import {
  NOTIFIABLE_TYPE_USER,
  NOTIFICATION_TYPE_EXPORT,
} from "@/enums/Notification";
import { translate } from "@/helpers/TranslationHelper";
import type { INotification } from "@/interfaces/Notification";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notifications";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import moment from "moment";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const logout = () => {
};

const icon = (icon: string) => {
  return new URL(`../assets/img/${icon}`, import.meta.url).href;
};

onMounted(() => {});

const notificationStore = useNotificationStore();
const { notifications, unreadCount } = storeToRefs(notificationStore);


const markAllNotificationAsRead = () => {
};
</script>

<style scoped>
.main404-container {
  width: calc(100vw - 20px);
  background-size: cover;
}

#app .card.card-main {
  max-width: 100%;
}

.welcome404-section {
  padding: 4rem 0rem;
  display: flex;
  row-gap: 30px;
  flex-flow: column;
  max-width: fit-content;
  transform-origin: center;
  animation: slideUp 0.5s ease alternate;
}

.welcome404-section > a {
  max-width: fit-content;
}

.welcome404-section > p {
  font-size: 20px;
  display: flex;
  align-items: center;
  max-width: 730px;
}

.content404-wrap {
  overflow: hidden;
  border-radius: 7px;
  padding: 0 2rem;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid rgb(51, 65, 92);
}

.content404-wrap h1 {
  font-size: 45px;
  margin: 0;
  padding: 0;
  text-align: left;
}

.welcome404 {
  font-family: "Poppins", sans-serif !important;
  font-weight: 900;
  font-size: 45px;
  padding-right: 10px;
  text-transform: uppercase;
}

.username {
  font-family: "Poppins", sans-serif !important;
  font-weight: normal;
  font-style: italic;
  font-size: 45px;
}

.pagenotfoundtext {
  font-family: Poppins;
  font-size: 30px;
}

@keyframes scale {
  0% {
    transform: scale(1, 1);
    opacity: 0;
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
