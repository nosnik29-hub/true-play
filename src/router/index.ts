import LayoutComponent from "@/components/LayoutComponent.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LayoutComponent,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/Profile/ProfileView.vue"),
          children: [
            {
              path: "",
              name: "profile.general",
              component: () => import("@/views/Profile/GeneralView.vue"),
            },
            {
              path: "security",
              name: "profile.security",
              component: () => import("@/views/Profile/SecurityView.vue"),
            },
            {
              path: "logs",
              name: "profile.logs",
              component: () => import("@/views/Profile/LogsView.vue"),
            },
          ],
        },
        {
          path: "/report_trueplay/upcoming_stream",
          name: "upcoming_stream",
          component: () => import("@/views/ReportTruePlay/UpcomingStream/IndexView.vue"),
        },
        {
          path: "/report_trueplay/featured_streamer",
          name: "featured_streamer",
          component: () => import("@/views/ReportTruePlay/FeaturedStreamerView.vue"),
        },
        {
          path: "/report_trueplay/games",
          name: "trueplay_games",
          component: () => import("@/views/ReportTruePlay/Games/IndexView.vue"),
        },
        {
          path: "/report_trueplay/popular_list",
          name: "popular_list",
          component: () => import("@/views/ReportTruePlay/PopularListView.vue"),
        },
        {
          path: "/report_trueplay/betting_rules",
          name: "betting_rules",
          component: () => import("@/views/ReportTruePlay/BettingRulesView.vue"),
        },
        {
          path: "/report_trueplay/chat",
          name: "chat",
          component: () => import("@/views/ReportTruePlay/ChatView.vue"),
        },
        {
          path: "/report_trueplay/tip",
          name: "tip",
          component: () => import("@/views/ReportTruePlay/Tip/IndexView.vue"),
        },
        {
          path: "/report_trueplay/tip_level",
          name: "tip_level",
          component: () => import("@/views/ReportTruePlay/TipLevel/IndexView.vue"),
        },
        {
          path: "/report_trueplay/stream_history",
          name: "stream_history",
          component: () => import("@/views/ReportTruePlay/StreamHistoryView.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/LoginView.vue"),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/twofactor",
      name: "twofactor",
      component: () => import("@/views/Auth/TwoFactotAuthentication.vue"),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/:catchAll(.*)*",
      name: "404PageNotFound",
      component: () => import("../views/404PageView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "AccessDenied",
      component: () => import("../views/AccessDeniedView.vue"),
    },
  ],
  scrollBehavior() {
    const el = document.getElementById("app") as HTMLElement;
    el.scrollIntoView();
  },
});

export default router;
