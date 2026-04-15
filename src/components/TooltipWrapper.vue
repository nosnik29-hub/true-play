<script setup lang="ts">
defineProps<{
  tip: string;
  tipIcon?: string;
  imageSrc?: string;
}>();
</script>

<template>
  <span>
    <a-tooltip
      color="white"
      placement="top"
      :title="tip"
    >
      <img
        v-if="imageSrc"
        class="m-auto"
        :src="imageSrc"
      />
    </a-tooltip>
    <a-tooltip
      color="white"
      placement="top"
      :title="tip"
    >
      <i
        v-if="tipIcon"
        class="fa tip cursor-pointer !text-[#A9ABB0] px-[20px]"
        :class="tipIcon"
      ></i>
    </a-tooltip>
  </span>
</template>
