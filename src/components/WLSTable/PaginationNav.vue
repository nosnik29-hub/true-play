<template>
  <div class="flex flex-row flex-nowrap items-center justify-center">
    <div class="flex gap-x-2 items-center h-[32px] mx-2 text-gray-800">
      <span class="whitespace-nowrap text-white">{{ translate("GoTo") }}</span>
      <input
        v-model="pageManualInput"
        class="text-white font-[10px] bg-[#2C3342] text-center goto-input w-[50px] h-[32px] border-gray-300 rounded-[5px]"
        :disabled="pagination.total_pages === 0"
        oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');"
        placeholder="🔍"
        type="text"
        @keyup="changePageInputChange"
      />
    </div>
    <nav
      aria-label="Pagination"
      class="bg-[#2C3342] isolate inline-flex -space-x-px rounded-md shadow-sm"
    >
      <button
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-0 ring-inset hover:bg-[#617DB2] focus:z-20 focus:outline-offset-0"
        :disabled="pagination.current_page == 1"
        @click.prevent="changePage(1)"
      >
        <span class="sr-only">First Page</span>
        <ChevronDoubleLeftIcon
          aria-hidden="true"
          class="h-5 w-5"
        />
      </button>
      <button
        aria-current="page"
        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-0 ring-inset hover:bg-[#617DB2] focus:z-20 focus:outline-offset-0"
        :disabled="pagination.current_page == 1"
        @click.prevent="previousPage"
      >
        <span class="sr-only">Previous Page</span>
        <ChevronLeftIcon
          aria-hidden="true"
          class="h-5 w-5"
        />
      </button>

      <button
        v-for="page in pages()"
        :key="page.name"
        aria-current="page"
        :class="[
          pagination.current_page == page.name
            ? 'relative z-10 inline-flex items-center bg-[#597EB7] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
            : 'relative hidden items-center px-4 py-2 text-[#9ca3af] text-sm font-semibold ring-0 ring-inset  hover:bg-[#617DB2] focus:z-20 focus:outline-offset-0 md:inline-flex',
        ]"
        :disabled="page.isDisabled"
        @click.prevent="changePage(page.name)"
      >
        {{ page.name }}
      </button>

      <button
        aria-current="page"
        class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-0 ring-inset hover:bg-[#617DB2] focus:z-20 focus:outline-offset-0"
        :disabled="pagination.current_page == pagination.total_pages"
        @click.prevent="nextPage"
      >
        <span class="sr-only">Next Page</span>
        <ChevronRightIcon
          aria-hidden="true"
          class="h-5 w-5"
        />
      </button>
      <button
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-0 ring-inset hover:bg-[#617DB2] focus:z-20 focus:outline-offset-0"
        :disabled="pagination.current_page == pagination.total_pages"
        @click.prevent="changePage(pagination.total_pages)"
      >
        <span class="sr-only">Last Page</span>
        <ChevronDoubleRightIcon
          aria-hidden="true"
          class="h-5 w-5"
        />
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/20/solid";

import { translate } from "@/helpers/TranslationHelper";
import type { IPagination } from "@/interfaces/ApiResponse";
import { ref } from "vue";

interface Props {
  pagination: IPagination;
  maxVisibleButton?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["change"]);

const maxVisibleButtons: number = props.maxVisibleButton ?? 5;

const nextPage = () => {
  if (props.pagination.current_page < props.pagination.total_pages) {
    changePage(props.pagination.current_page + 1);
  }
};
const previousPage = () => {
  if (props.pagination.current_page > 1) {
    changePage(props.pagination.current_page - 1);
  }
};

const startPage = (): number => {
  // When on the first page
  if (props.pagination.current_page === 1) {
    return 1;
  }

  // When on the last page
  if (props.pagination.current_page === props.pagination.total_pages) {
    return props.pagination.total_pages - maxVisibleButtons + 1;
  }

  // When inbetween

  if (
    props.pagination.current_page + maxVisibleButtons >
    props.pagination.total_pages + 1
  ) {
    const forward =
      props.pagination.total_pages - props.pagination.current_page;
    const back = maxVisibleButtons - forward;
    const start = props.pagination.current_page - back;
    return start + 1;
  }
  return props.pagination.current_page - 1;
};

const pages = (): any => {
  const start = startPage() < 1 ? 1 : startPage();
  const range = [];
  for (
    let i = start;
    i <= Math.min(start + maxVisibleButtons - 1, props.pagination.total_pages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.pagination.current_page,
    });
  }

  return range;
};

const pageManualInput = ref(null as number | null);

const changePageInputChange = (event: KeyboardEvent) => {
  if (event.key === "Enter" && pageManualInput.value != null) {
    if (pageManualInput.value <= props.pagination.total_pages) {
      changePage(pageManualInput.value);
    }
  }
};

const changePage = (page: number) => {
  pageManualInput.value = null;
  emit("change", page);
};
</script>
