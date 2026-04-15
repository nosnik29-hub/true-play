<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div
    :class="[
      hasButton ? '' : 'pointer-events-none',
      'absolute inset-y-0 right-0 flex items-center pr-3',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const slots = useSlots();
const hasButton = computed(() => {
  return (
    (slots.default &&
      slots.default().some((vnode) => {
        return vnode.type === "button";
      })) ??
    false
  );
});
</script>
