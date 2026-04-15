<template>
  <div class="flex flex-col gap-y-[10px]">
    <div
      class="refresh-table flex flex-row flex-wrap justify-between items-center"
    >
      <div
        ref="tableContainer"
        class="flex items-center flex-wrap gap-2 mr-4"
      >
        <button
          class="btn-refresh"
          @click.prevent="refresh"
        >
          <i class="fa fa-refresh"></i>
        </button>
        <span>{{ t("Show") }}</span>
        <select
          v-model="perPage"
          class="bg-[#2C3342] rounded-md px-1 py-1 outline-none"
          @change="changePage(1)"
        >
          <option
            v-for="value in perPageList"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
        <span>{{ t("entries") }}</span>
        <slot name="tableContainer"></slot>
      </div>
    </div>

    <section class="relative">
      <div :class="['preloader', preloader ? '' : '!hidden']">
        <img
          class="w-[50px] h-[50px]"
          src="@/assets/img/og-spinner.gif"
        />
      </div>
      <div class="table-scroll">
        <table class="table-auto table-custom min-w-full">
          <thead ref="tableHeader">
            <slot name="columnHeader"></slot>
          </thead>
          <tbody
            id="tableBody"
            ref="tableBody"
            class=""
          >
            <slot :data="data"></slot>

            <tr
              v-if="data.length == 0"
              class="bg-gray-0"
            >
              <td
                class="whitespace-nowrap py-4 text-sm text-center"
                :colspan="(tableHeader?.childElementCount ?? 0) + 1"
              >
                {{ t("NoDataAvailable") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="flex items-center justify-center">
      <!-- <div class="flex flex-1 justify-between sm:hidden">
        <a
          class="btn btn-primary relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          href="#"
        >
          {{ t("Previous") }}
        </a>
        <a
          class="btn btn-primary relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          href="#"
        >
          {{ t("Next") }}
        </a>
      </div> -->
      <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="table-showing text-center">
            {{ t("Showing") }}
            <span>
              <template v-if="pagination.total == 0">0</template>
              <template v-else>
                {{
                  defaultToZero(
                    (pagination.current_page - 1) * pagination.per_page + 1
                  )
                }}
              </template>
            </span>
            {{ t("to") }}
            <span>
              {{
                defaultToZero(
                  (pagination.current_page - 1) * pagination.per_page +
                    pagination.count
                )
              }}
            </span>
            {{ t("of") }}
            <span>{{ pagination.total ?? 0 }}</span>
            {{ t("entries") }}
          </p>
        </div>
        <div>
          <PaginationNav
            class="justify-end table-pagination"
            :pagination="pagination"
            @change="changePage"
          ></PaginationNav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="Data">
import type { IPagination } from "@/interfaces/ApiResponse";
import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { onMounted, provide, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import PaginationNav from "./PaginationNav.vue";

const { t } = useI18n();

const settingStore = useSettingStore();
const { perPage } = storeToRefs(settingStore);
const perPageList = [5, 10, 20, 50, 100, 200];

const props = defineProps<{
  pagination: IPagination;
  data: Data[];
  hideAction?: boolean;
  preloader?: boolean;
}>();

const defaultToZero = (number: number) => {
  if (isNaN(number)) {
    return 0;
  }
  return number;
};

const orderBy = ref({} as IOrderBy);
const updateOrderBy = (sortKey: string) => {
  if (sortKey in orderBy.value) {
    if (orderBy.value[sortKey] == "asc") {
      orderBy.value[sortKey] = "desc";
    } else if (orderBy.value[sortKey] == "desc") {
      delete orderBy.value[sortKey];
    } else {
      orderBy.value[sortKey] = "asc";
    }
  } else {
    // orderBy.value[sortKey] = "asc";
    orderBy.value = { [sortKey]: "asc" };
  }
  emit("orderBy", orderBy.value);
};

const tableBody = ref<HTMLInputElement>();
const tableHeader = ref<HTMLInputElement>();
const tableContainer = ref<HTMLInputElement>();

onMounted(() => {
  // TODO Refactor to using vue slots instead. Check line 31
  if (document.getElementById("tableHeaderContainer") !== null) {
    tableContainer.value?.appendChild(
      document.getElementById("tableHeaderContainer")!
    );
  }
  //   if (document.getElementById("tableHeader") !== null) {
  //     tableHeader.value?.appendChild(document.getElementById("tableHeader")!);
  //   }
});

const test = toRef(props, "data");
provide("somedata", test as any);
provide("orderBy", {
  orderBy,
  updateOrderBy,
});
// watch(
//   () => props.sortBy,
//   () => {
//     console.log("aaaaa");
//   }
// );
const currentPage = ref(1);

const emit = defineEmits(["change", "refresh", "export-data", "orderBy"]);

const refresh = () => {
  emit("refresh", (currentPage.value = 1));
};

const changePage = (page: number) => {
  currentPage.value = page;
  emit("change", page, orderBy.value);
};
</script>
