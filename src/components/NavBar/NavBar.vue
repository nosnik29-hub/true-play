<template>
  <div class="card flex-auto">
    <div class="nav">
      <template
        v-for="item in navLinks"
        :key="item.label"
      >
        <div
          v-if="hasPermission(item.permissions)"
          class="nav-container"
        >
          <div class="nav-parent">
            <NavBarItem
              :item="item"
              @close="closeMenu"
            ></NavBarItem>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission } from "@/helpers/PermissionHelper";
import type { NavLink } from "@/interfaces/Navigation";
import NavBarItem from "./NavBarItem.vue";

const emit = defineEmits(["close"]);
const closeMenu = () => {
  emit("close");
};

const iconUrl = (icon: string) => {
  return new URL(`../../assets/img/${icon}`, import.meta.url).href;
};

const checkPermission = (item: NavLink) => {
  const hasChildPermission = (items: NavLink[]): boolean => {
    return items.some(
      (child) =>
        hasPermission(child.permissions) || hasChildPermission(child.children)
    );
  };

  if (item.children.length) {
    return hasChildPermission(item.children);
  }

  console.log(item.label, hasPermission(item.permissions));
  return hasPermission(item.permissions);
};

const navLinks: NavLink[] = [
  {
    label: "Report Trueplay",
    href: "#",
    icon: {
      path: iconUrl("reports.svg"),
      class: "px-1 py-1 w-[30px]",
    },
    permissions: ["report"],
    children: [
      {
        label: "UpcomingStream",
        href: { name: "upcoming_stream" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "FeaturedStreamer",
        href: { name: "featured_streamer" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "Games",
        href: { name: "trueplay_games" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "PopularList",
        href: { name: "popular_list" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "BettingRules",
        href: { name: "betting_rules" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "Chat",
        href: { name: "chat" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "Tip",
        href: { name: "tip" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "TipLevel",
        href: { name: "tip_level" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
      {
        label: "StreamHistory",
        href: { name: "stream_history" },
        icon: {
          path: null,
        },
        permissions: [],
        children: [],
      },
    ],
  },
];
</script>

<style scoped></style>
