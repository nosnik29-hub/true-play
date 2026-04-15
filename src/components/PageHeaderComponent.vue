<script setup lang="ts">
defineProps<{
  pageTitle: string;
  menuGroup?: string;
  imgUrl?: string;
}>();

const pageIcon = (icon: string) => {
  return new URL(`../assets/img/${icon}`, import.meta.url).href;
};
</script>

<template>
  <div class="page-header">
    <div class="inline-flex flex-auto items-center">
      <div class="pr-[20px]">
        <div class="page-header-title-icon">
          <div>&nbsp;</div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="w-full inline-flex flex-wrap justify-between">
        <div class="flex flex-row flex-wrap">
          <h1
            class="page-header-title break-words block truncate max-w-[350px]"
            :title="pageTitle"
          >
            {{ pageTitle }}
          </h1>
          <slot></slot>
        </div>

        <div class="flex flex-row flex-nowrap items-center text-[12px] gap-2">
          <img
            v-if="imgUrl != undefined"
            class="max-h-[16px]"
            :src="pageIcon(imgUrl)"
          />
          <b class="whitespace-nowrap">{{ menuGroup }}</b>
          <div v-if="menuGroup != undefined">&gt;</div>
          <span
            class="whitespace-nowrap break-words block truncate max-w-[300px]"
          >
            {{ pageTitle }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
