<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import WLSColumnHeaderItem from "@/components/WLSTable/WLSColumnHeaderItem.vue";
import WLSRow from "@/components/WLSTable/WLSRow.vue";
import WLSRowColumn from "@/components/WLSTable/WLSRowColumn.vue";
import WLSTable from "@/components/WLSTable/WLSTable.vue";
import WLSTableHeaderContainer from "@/components/WLSTable/WLSTableHeaderContainer.vue";
import { dateFormat } from "@/helpers/DateHelper";
import { hasPermission } from "@/helpers/PermissionHelper";
import { translate } from "@/helpers/TranslationHelper";
import type { IPagination } from "@/interfaces/ApiResponse";
import type { IStreamHistory } from "@/interfaces/StreamHistory";

import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();

const streamHistoryList = ref([] as IStreamHistory[]);
const pagination = ref({} as IPagination);

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);


const form = ref({
	stream_date : [],
  streamer_name: "",
});

streamHistoryList.value = [
  {
    stream_date: new Date("2026-04-01"),
	  stream_start_time: "07:00 PM",
	  stream_end_time: "08:00 PM",
	  streamer_name: "Test 1",
	  stream_key: "1234567",
	  viewers: 100,
	  comments: 100,
	  reactions: 100,
	  shares: 100,
	  tips: 100,
	  status: 100,
	  total_time: 100,
  },
  {
    stream_date: new Date("2026-04-01"),
	  stream_start_time: "04:00 PM",
	  stream_end_time: "06:00 PM",
	  streamer_name: "Test 2",
	  stream_key: "123456789",
	  viewers: 1000,
	  comments: 1000,
	  reactions: 1000,
	  shares: 1000,
	  tips: 1000,
	  status: 1000,
	  total_time: 1000,
  }
]

const reset = () => {
  streamHistoryList.value = [];
  form.value.stream_date = [];
  form.value.streamer_name = "";
  pagination.value = {} as IPagination;
};

const exportDataHandler = () => {
};
</script>

<template>
  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('StreamHistory')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
        <form>
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          ><!--  Stream Date  -->
          <div class="form_inputs">
              <label>{{ translate("StreamDate") }}</label>
              <DateRangePicker
                v-model="form.stream_date"
                :enable-time-picker="true"
                input-class-name="form-control"
                :locale="language"
                :placeholder="translate('StreamDatePlaceholder')"
              ></DateRangePicker>
            </div>
            <!--  Streamer Name -->
            <InputText
              id="transaction_id"
              v-model="form.streamer_name"
              :label="translate('StreamerName')"
              :placeholder="translate('StreamerNamePlaceholder')"
              type="text"
            ></InputText>
          </div>
          <section class="py-[10px] flex flex-row flex-wrap gap-4">
            <button
              class="btn btn-primary"
              type="submit"
            >
              {{ translate("Search") }}
            </button>
            <button
              class="btn btn-danger"
              type="reset"
              @click="reset"
            >
              {{ translate("Reset") }}
            </button>
            <div
              v-if="hasPermission(['add-vendor'])"
              class="border-l-2 border-[#293344]"
            ></div>
          </section>
        </form>
        <WLSTable
          :data="streamHistoryList"
          :pagination="pagination"
          :preloader="preloader"
          @order-by="updateOrderBy"
        >
          <template #columnHeader>
						<WLSColumnHeaderItem sortKey="stream_date">
              {{ translate("StreamDate") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="stream_start_time">
              {{ translate("StreamStartTime") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="stream_end_time">
              {{ translate("StreamEndTime") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="streamer_name">
              {{ translate("StreamerName") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="stream_key">
              {{ translate("StreamKey") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="viewers">
              {{ translate("Viewers") }}
            </WLSColumnHeaderItem>
						<WLSColumnHeaderItem sortKey="comments">
              {{ translate("Comments") }}
            </WLSColumnHeaderItem>
						<WLSColumnHeaderItem sortKey="Reactions">
              {{ translate("Reactions") }}
            </WLSColumnHeaderItem>
						<WLSColumnHeaderItem sortKey="shares">
              {{ translate("Shares") }}
            </WLSColumnHeaderItem>
						<WLSColumnHeaderItem sortKey="tips">
              {{ translate("Tips") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="status">
              {{ translate("Status") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="total_time">
              {{ translate("TotalTime") }}
            </WLSColumnHeaderItem>
          </template>

          <WLSRow v-slot="{ row }: { row: IStreamHistory }">
            <WLSRowColumn> {{ dateFormat(row.stream_date) }} </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.stream_start_time }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.stream_end_time }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.streamer_name }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.stream_key }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.viewers }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.comments }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.reactions }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.shares }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.tips }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              {{
                row.status == 1
                  ? translate("Activated")
                  : translate("Deactivated")
              }}
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.total_time }}
              </span>
            </WLSRowColumn>
          </WLSRow>
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', streamHistoryList.length === 0 ? 'disabled' : '']"
              :disabled="streamHistoryList.length === 0"
              type="button"
              @click="exportDataHandler()"
            >
              <i class="fa fa-file-export"></i>
              {{ translate("Export") }}
            </button>
          </WLSTableHeaderContainer>
        </WLSTable>
      </main>
    </div>
  </div>
</template>
