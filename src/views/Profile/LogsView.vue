<script setup lang="ts">
import Modal from "@/components/ModalComponent.vue";
import WLSColumnHeaderItem from "@/components/WLSTable/WLSColumnHeaderItem.vue";
import WLSRow from "@/components/WLSTable/WLSRow.vue";
import WLSRowColumn from "@/components/WLSTable/WLSRowColumn.vue";
import WLSTable from "@/components/WLSTable/WLSTable.vue";
import { dateFormat } from "@/helpers/DateHelper";
import { translate } from "@/helpers/TranslationHelper";
import type { IAuditLog } from "@/interfaces/ActivityLogs";
import type { IPagination } from "@/interfaces/ApiResponse";
import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const preloader = ref(false);
const preloaderTimeout = ref(undefined as undefined | number);
let abortController = new AbortController();
const isRequestActive = ref(false);
const settingStore = useSettingStore();
const { perPage } = storeToRefs(settingStore);
const pagination = ref({} as IPagination);
const profileLogsList = ref([] as any);

const isUrlModalOpen = ref(false);
const isUserAgentModalOpen = ref(false);
const isPayloadModalShown = ref(false);

const closeAllModals = () => {
  isUserAgentModalOpen.value = false;
  isUrlModalOpen.value = false;
  isPayloadModalShown.value = false;
};

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const searchPage = async (page: number) => {
  
};


const payloadUrl = ref();
const payloadUserAgent = ref();

const showUrl = (url: string) => {

};

const showUserAgent = (user_agent: string) => {

};

const payloadContent = ref();

const showPayload = (payload: string) => {

};

const fetchAuditLogDetails = (e: Event, id: number) => {
  
};
</script>

<template>
  <Modal
    :modalTitle="translate('Payload')"
    :open="isPayloadModalShown"
    @close="closeAllModals"
  >
    <div
      class="pt-6 pr-6 pl-6 flex flex-col items-center justify-center w-full mb-[80px]"
    >
      <textarea
        class="form-control outline-0"
        readonly
        rows="12"
        :value="payloadContent"
      ></textarea>
      <section
        class="absolute bottom-0 py-4 px-6 pb-7 h-auto flex flex-row flex-nowrap items-center justify-center m-auto w-full gap-x-[10px]"
      >
        <button
          class="btn btn-default"
          type="button"
          @click="closeAllModals"
        >
          {{ translate("Close") }}
        </button>
      </section>
    </div>
  </Modal>
  <Modal
    :modalTitle="translate('URL')"
    :open="isUrlModalOpen"
    @close="closeAllModals"
  >
    <div
      class="pt-6 pr-6 pl-6 flex flex-col items-center justify-center w-full mb-[80px]"
    >
      <textarea
        class="form-control outline-0"
        readonly
        rows="8"
        :value="payloadUrl"
      ></textarea>
      <section
        class="absolute bottom-0 py-4 px-6 pb-7 h-auto flex flex-row flex-nowrap items-center justify-center m-auto w-full gap-x-[10px]"
      >
        <button
          class="btn btn-default"
          type="button"
          @click="closeAllModals"
        >
          {{ translate("Close") }}
        </button>
      </section>
    </div>
  </Modal>
  <Modal
    :modalTitle="translate('UserAgent')"
    :open="isUserAgentModalOpen"
    @close="closeAllModals"
  >
    <div
      class="pt-6 pr-6 pl-6 flex flex-col items-center justify-center w-full mb-[80px]"
    >
      <textarea
        class="form-control outline-0"
        readonly
        rows="8"
        :value="payloadUserAgent"
      ></textarea>
      <section
        class="absolute bottom-0 py-4 px-6 pb-7 h-auto flex flex-row flex-nowrap items-center justify-center m-auto w-full gap-x-[10px]"
      >
        <button
          class="btn btn-default"
          type="button"
          @click="closeAllModals"
        >
          {{ translate("Close") }}
        </button>
      </section>
    </div>
  </Modal>
  <div>
    <!-- <pre>{{ profileLogsList }}</pre> -->
    <WLSTable
      :data="profileLogsList"
      :pagination="pagination"
      :preloader="preloader"
      @change="searchPage"
      @order-by="updateOrderBy"
      @refresh="searchPage"
    >
      <template #columnHeader>
        <WLSColumnHeaderItem>
          {{ translate("#") }}
        </WLSColumnHeaderItem>
        <WLSColumnHeaderItem sortKey="created_at">
          {{ translate("DateCreated") }}
        </WLSColumnHeaderItem>
        <WLSColumnHeaderItem sortKey="ip">
          {{ translate("VisitedIP") }}
        </WLSColumnHeaderItem>
        <WLSColumnHeaderItem sortKey="activity">
          {{ translate("Activity") }}
        </WLSColumnHeaderItem>
        <WLSColumnHeaderItem>
          {{ translate("Payload") }}
        </WLSColumnHeaderItem>
        <WLSColumnHeaderItem sortKey="user_agent">
          {{ translate("UserAgent") }}
        </WLSColumnHeaderItem>
      </template>

      <WLSRow v-slot="{ row, index }: { row: IAuditLog; index: number }">
        <WLSRowColumn>
          {{ (pagination.current_page - 1) * perPage + index + 1 }}
        </WLSRowColumn>
        <WLSRowColumn>
          {{ dateFormat(row.create_at) }}
        </WLSRowColumn>
        <WLSRowColumn>{{ row.ip }}</WLSRowColumn>
        <WLSRowColumn>
          {{ translate(row.activity) }}
        </WLSRowColumn>
        <WLSRowColumn>
          <button
            class="table-link"
            @click="fetchAuditLogDetails($event, row.id)"
          >
            {{ translate("View") }}
          </button>
        </WLSRowColumn>
        <WLSRowColumn
          class="truncate_td custom-link"
          :title="row.user_agent"
        >
          <span @click="showUserAgent(row.user_agent)">
            {{ row.user_agent }}
          </span>
        </WLSRowColumn>
      </WLSRow>
    </WLSTable>
  </div>
</template>
