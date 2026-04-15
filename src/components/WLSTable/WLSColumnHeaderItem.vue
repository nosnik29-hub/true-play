<template>
  <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6 z-2">
    <button
      v-if="sortKey != '' && data.length != 0"
      class="group inline-flex outline-0"
      @click.prevent="updateOrderBy(props.sortKey)"
    >
      <slot></slot>
      <span class="ml-1 flex-none rounded">
        <i :class="['fa', sortIcon]"></i>
      </span>
    </button>

    <slot v-else></slot>
  </th>
</template>

<script setup lang="ts">
import type { IOrderBy } from "@/interfaces/WLSTable";
import type { Ref } from "vue";
import { computed, inject } from "vue";

type OrderByInject = {
  orderBy: Ref<IOrderBy>;
  updateOrderBy: (sortKey: string) => void;
};

const props = defineProps({
  sortKey: {
    type: String,
    required: false,
    default: "",
  },
});

const data = inject("somedata") as any;

const sortIcon = computed(() => {
  if (props.sortKey in orderBy.value) {
    if (orderBy.value[props.sortKey] == "asc") {
      return "fa-arrow-up";
    } else if (orderBy.value[props.sortKey] == "desc") {
      return "fa-arrow-down";
    }
  }
  return "fa-exchange-alt rotate-90";
});

const { orderBy, updateOrderBy } = inject("orderBy") as OrderByInject;
</script>

<style scoped>
.z-2 {
  z-index: 2;
}
</style>
