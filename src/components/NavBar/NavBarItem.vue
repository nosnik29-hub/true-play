<template>
  <template v-if="!item.children.length">
    <template v-if="hasPermission(item.permissions)">
      <RouterLink
        v-if="item.href != '#'"
        class="nav-item w-full"
        :to="item.href"
      >
        <img
          v-if="item.icon.path !== null && item.icon.class !== null"
          :class="item.icon.class"
          :src="item.icon.path!"
        />
        <span class="flex-grow">{{ translate(item.label) }}</span>
      </RouterLink>

      <div
        v-else
        class="nav-items"
      >
        <img
          v-if="item.icon.path != null && item.icon.class !== null"
          :class="item.icon.class"
          :src="item.icon.path!"
        />
        <span class="flex-grow">{{ translate(item.label) }}</span>
      </div>
    </template>
  </template>
  <Disclosure
    v-else
    v-slot="{ open }"
    :default-open="hasActiveChild"
  >
    <DisclosureButton
      as="div"
      :class="['nav-items', open ? 'active' : '']"
    >
      <img
        v-if="item.icon.path != null && item.icon.class != null"
        :class="item.icon.class"
        :src="item.icon.path!"
      />
      <span>{{ translate(item.label) }}</span>
      <i class="fa fa-chevron-down ml-auto"></i>
    </DisclosureButton>
    <transition
      enter-active-class="transition transition-[max-height] duration-500 ease-in"
      enter-from-class="transform max-h-0"
      enter-to-class="transform max-h-screen"
      leave-active-class="transition transition-[max-height] duration-500 ease-out"
      leave-from-class="transform max-h-screen"
      leave-to-class="transform max-h-0"
    >
      <DisclosurePanel class="bg-[#2B3343]">
        <NavBarItem
          v-for="child in item.children"
          :key="child.label"
          :item="child"
        ></NavBarItem>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { hasPermission } from "@/helpers/PermissionHelper";
import { translate } from "@/helpers/TranslationHelper";
import type { NavLink } from "@/interfaces/Navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Props {
  item: NavLink;
}
const route = useRoute();
const router = useRouter();

const emit = defineEmits(["close"]);
const closeNav = () => {
  emit("close");
};

const hasActiveChild = computed(
  () =>
    props.item.children?.some((item) => {
      closeNav();
      if (item.href === "#") {
        return false;
      }

      return router.resolve(item.href).name == route.name;
    })
);

const props = defineProps<Props>();
</script>

<style scoped></style>
