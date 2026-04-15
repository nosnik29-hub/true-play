<template>
  <div class="mb-5">
    <label>{{ translate("FileUpload") }}</label>
    <HelperCsvComponent csv="sample-player" />
    <div
      :class="[
        csvFileName ? '' : '!text-[#7a828f]',
        'form-control uploadButton',
      ]"
      @click="inputCsv.click()"
    >
      <i class="fa-solid fa-upload pr-3"></i>
      <span>
        {{ fileBoxLabel }}
      </span>
      <input
        ref="inputCsv"
        accept=".csv"
        hidden
        type="file"
        @change="handleFileInputChange()"
      />
    </div>
    <div
      v-if="fileError"
      class="form-error mb-2"
    >
      {{ translate("FileProblem") }}
    </div>
  </div>
  <WLSTable
    :data="tableList"
    :pagination="pagination"
    :preloader="preloader"
    @change="searchPage"
    @refresh="refresh"
  >
    <template #columnHeader>
      <WLSColumnHeaderItem>
        {{ translate("PromoPlayerId") }}
      </WLSColumnHeaderItem>
      <WLSColumnHeaderItem>
        {{ translate("PromoOperatorId") }}
      </WLSColumnHeaderItem>
      <WLSColumnHeaderItem>
        {{ translate("PromoPlayerAmount") }}
      </WLSColumnHeaderItem>
    </template>

    <WLSRow v-slot="{ row }: { row: IPlayerList }">
      <WLSRowColumn
        class="truncate_td !max-w-[200px]"
        :title="row.player_id"
      >
        {{ row.player_id }}
      </WLSRowColumn>
      <WLSRowColumn>{{ row.operator_id }}</WLSRowColumn>
      <WLSRowColumn>{{ row.amount }}</WLSRowColumn>
    </WLSRow>
  </WLSTable>
  <div
    v-if="playerError"
    class="form-error mb-2"
  >
    {{ translate("InvalidPlayerList") }}
  </div>
</template>

<script setup lang="ts">
import HelperCsvComponent from "@/components/Promo/HelperCsvComponent.vue";
import WLSColumnHeaderItem from "@/components/WLSTable/WLSColumnHeaderItem.vue";
import WLSRow from "@/components/WLSTable/WLSRow.vue";
import WLSRowColumn from "@/components/WLSTable/WLSRowColumn.vue";
import WLSTable from "@/components/WLSTable/WLSTable.vue";
import { translate } from "@/helpers/TranslationHelper";
import type { IPagination } from "@/interfaces/ApiResponse";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

interface IPlayerList {
  player_id: string;
  operator_id: number;
  amount: number;
}

const props = defineProps({
  modelValue: { type: Array, required: true },
  errors: { type: Object },
});
const emit = defineEmits(["update:modelValue"]);

const settingStore = useSettingStore();
const { perPage } = storeToRefs(settingStore);
const playerList: any = ref(props.modelValue);
const tableList: any = ref([]);
const preloader = ref(false);
const fileError = ref(false);
const inputCsv: any = ref(null);
const csvFileName = ref("");
const pagination = ref({
  total: 0,
  count: 0,
  per_page: 10,
  current_page: 1,
  total_pages: 1,
} as IPagination);

const fileBoxLabel = computed(() => {
  return csvFileName.value ? csvFileName.value : translate("SelectFile");
});

const playerError = computed(() => {
  if (props.errors) {
    return Object.keys(props.errors).filter((key) => /players./.test(key))
      .length;
  }
  return false;
});

const refresh = (page: number) => {
  tableList.value = playerList.value.slice(
    (page - 1) * perPage.value,
    page * perPage.value
  );
  pagination.value.current_page = page;
  pagination.value.per_page = perPage.value;
  pagination.value.total = playerList.value.length;
  pagination.value.total_pages = Math.max(
    1,
    Math.ceil(playerList.value.length / perPage.value)
  );

  pagination.value.count = tableList.value.length;
  emit("update:modelValue", playerList.value);
};

const searchPage = (page: number) => {
  refresh(page);
};

const convertCsvToObject = (csv: string) => {
  const lines = csv.split("\r\n");
  // Extract header (first row)
  const headers = lines[0].split(",");

  const result = [];

  // Iterate over the remaining rows
  if (headers.includes("player_id") && headers.includes("amount")) {
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length !== headers.length) {
        // Skip invalid rows
        continue;
      }

      const row: Record<string, any> = {};

      // Map values to headers
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = currentLine[j];
      }

      result.push(row);
    }

    return result; //JavaScript object
  }
};

const handleFileInputChange = () => {
  fileError.value = false;
  preloader.value = true;
  const fileInput = inputCsv.value as HTMLInputElement;

  if (fileInput.files?.length) {
    csvFileName.value = fileInput.files[0]["name"];

    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        let csv = e.target.result as string;
        let csvObject = convertCsvToObject(csv);
        if (!csvObject?.length) fileError.value = true;
        playerList.value = csvObject;
        refresh(1);
      }
    };

    reader.readAsText(fileInput.files[0]);
  } else {
    csvFileName.value = "";
    playerList.value = [];
    refresh(1);
  }
  preloader.value = false;
};

refresh(1);
</script>

<style scoped>
.uploadButton {
  max-width: 15rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .fileBox {
  display: inline-block;
  height: 1rem;
  width: 10rem;

} */
</style>
