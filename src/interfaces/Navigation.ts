import type { RouteLocationRaw } from "vue-router";

export interface NavLink {
  label: string;
  href: RouteLocationRaw;
  icon: {
    path: string | null;
    class?: string | null;
  };
  children: NavLink[];
  permissions: string[];
}
