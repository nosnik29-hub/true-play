<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const icon = (icon: string) => {
  return new URL(`../assets/img/${icon}`, import.meta.url).href;
};

const homePageMenu = [
  {
    menuLabel: "Report",
    icon: icon("reports.svg"),
    link: { name: "betting_transaction_history" },
  },
  {
    menuLabel: "ContentManagement",
    icon: icon("content-management.svg"),
    link: { name: "player" },
  },
  {
    menuLabel: "Promotion",
    icon: icon("promotion.svg"),
    link: { name: "betting_transaction_history" },
  },
  {
    menuLabel: "Permission",
    icon: icon("permission.svg"),
    link: { name: "role_settings.index" },
  },
  {
    menuLabel: "SystemConfig",
    icon: icon("system-conf.svg"),
    link: { name: "betting_transaction_history" },
  },
  {
    menuLabel: "ActivityLogs",
    icon: icon("logs.svg"),
    link: { name: "logs.index" },
  },
  {
    menuLabel: "Profile",
    icon: icon("profile.svg"),
    link: { name: "profile.general" },
  },
];
</script>

<template>
  <main
    class="homemain-wrap"
    :style="{ 'background-image': 'url(' + icon('home_bg.jpg') + ')' }"
  >
    <div class="content-wrap">
      <!--Welcome Message-->
      <div class="welcome-section">
        <h1>
          <span class="welcome">{{ translate("Welcome") }},</span>
          <span class="username">{{ user.username }}!</span>
        </h1>
        <p>{{ translate("WelcomeMessage") }}</p>
      </div>
      <!--Menu blocks Navigation-->
      <!-- <div class="menuBlock">
        <RouterLink
          v-for="(menu, index) in homePageMenu"
          :key="index"
          :to="menu.link"
        >
          <div><img :src="menu.icon" /></div>
          <p>{{ translate(menu.menuLabel) }}</p>
        </RouterLink>
      </div> -->
      <!--Copyright Section-->
      <!-- <div class="copyright-section">
        <img src="@/assets/img/OGlogo.png" />
        <span>
          &copy;
          <b>2023 OGAPI.</b>
          {{ translate("AllRightsReserved") }}
        </span>
        <span>{{ translate("AppVersion") }}</span>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 50px) !important;
}

.home-main-container {
  max-width: calc(100vw - 20px);
}

#app .page-container {
  min-height: calc(100vh - 50px) !important;
}

.welcome-section {
  padding: 4rem 0 0 0rem;
  display: flex;
  row-gap: 30px;
  flex-flow: column;
  transform-origin: center;
  animation: slideUp 0.5s ease alternate;
}

.welcome-section > p {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 600px;
}

.welcome-section > h1 {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.content-wrap {
  display: flex;
  flex-flow: column;
  row-gap: 100px;
  align-items: center;
  justify-content: center;
}

.content-wrap h1 {
  font-size: 45px;
}

.menuBlock {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 2rem;
  row-gap: 2rem;
  padding: 0 1rem;
  transform-origin: center;
  animation: scale 1s ease alternate;
}

.menuBlock > a {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  row-gap: 15px;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 160px;
  border: 1px solid rgba(255 255 255 / 0.2);
  border-radius: 10px;
}

.menuBlock > a:hover {
  transform: scale(1.05);
  border: 1px solid rgba(255 255 255 / 1);
  transition: transform 0.25s ease-in-out;
}

.menuBlock > a > div {
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menuBlock > a > div > img {
  height: 35px;
}

.menuBlock > a > p {
  text-transform: uppercase;
  font-size: 13px;
  padding: 0 1rem;
  height: 2rem;
}

.welcome {
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
  white-space: wrap;
  text-align: center;
}

.copyright-section {
  padding: 0 2rem 4rem 2rem;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 1rem;
  justify-content: center;
}

.copyright-section > img {
  height: 44px;
}

.copyright-section > span {
  font-size: 10px;
}

.homemain-wrap {
  overflow: hidden;
  border-radius: 7px;
  padding: 0 2rem;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  background-repeat: no-repeat;
  background-position: 2px 2px;
  background-size: cover;
  border: 1px solid rgb(51, 65, 92);
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

@media only screen and (max-width: 469px) and (min-width: 0px) {
  .menuBlock {
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    padding: 0;
    transition: all 0.25s;
  }
  .menuBlock > a {
    column-gap: 0.5rem;
    row-gap: 1rem;
    padding: 0;
  }
  .content-wrap {
    row-gap: 50px;
  }
}
</style>
