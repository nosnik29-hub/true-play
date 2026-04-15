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
import type { IUpcomingStream } from "@/interfaces/UpcomingStream";

import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import CreateSticker from "@/views/ReportTruePlay/Tip/CreateTip.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();

const tipList = ref([] as IUpcomingStream[]);
const pagination = ref({} as IPagination);

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
  searchPage(1);
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);
const isAddStickerShown = ref(false);

const statusOptions = [
  { value: null, label: "All" },
  { value: 1, label: "Activated" },
  { value: 0, label: "Deactivated" },
];

const form = ref({
	status: 1,
	settings: 1,
});

const initSearch = () => {
  searchPage(1);
};

const reset = () => {
  tipList.value = [];
  form.value.status = 1;
  form.value.settings = 1;
  pagination.value = {} as IPagination;
  initSearch();
};

const searchPage = async (page: number) => {

};

const createCloseFloating = () => {
  isAddStickerShown.value = false;
  searchPage(1);
};

const cancel = () => {
  isAddStickerShown.value = false;
};

const initCreateForm = () => {
  isAddStickerShown.value = true;
};

const createStickerComponent = ref(null);

initSearch();

</script>

<template>
  <ModalComponent
    :modalTitle="translate('AddSticker')"
    :open="isAddStickerShown"
    @close="createCloseFloating"
  >
    <CreateSticker
      ref="createStickerComponent"
      @cancel="cancel"
    ></CreateSticker>
  </ModalComponent>

  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('Tip')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
        <form @submit.prevent="initSearch">
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          >
          	<!-- Tip Status  -->
						<div class="form_inputs">
          	  <label>{{ translate("TipStatus") }}</label>
          	  <DropdownComponent
          	      id="activation"
          	      v-model="form.status"
          	      :get-option-label="(option: any) => translate(option.label)"
          	      :options="statusOptions"
          	  />
          	</div>

						<!-- Tip Settings  -->
						<div class="form_inputs">
          	  <label>{{ translate("TipSettings") }}</label>
          	  <DropdownComponent
          	      id="activation"
          	      v-model="form.status"
          	      :get-option-label="(option: any) => translate(option.label)"
          	      :options="statusOptions"
          	  />
          	</div>
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
            <button
              v-if="hasPermission(['add-vendor'])"
              class="btn btn-success"
              type="button"
              @click="initCreateForm"
            >
              {{ translate("AddSticker") }}
            </button>
          </section>
        </form>
        <WLSTable
          :data="tipList"
          :pagination="pagination"
          :preloader="preloader"
          @change="searchPage"
          @order-by="updateOrderBy"
          @refresh="searchPage"
        >
          <template #columnHeader>
            <WLSColumnHeaderItem sortKey="id">
              #
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="sticker_name">
              {{ translate("StickerName") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="image">
              {{ translate("Image") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="amount">
              {{ translate("Amount") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="status">
              {{ translate("Status") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="created_date">
              {{ translate("CreatedDate") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem >
              {{ translate("Action") }}
            </WLSColumnHeaderItem>
          </template>

          <!-- <WLSRow v-slot="{ row }: { row: IVendor }">
            <WLSRowColumn
              class="truncate_td ellipsis-blue"
              :title="row.vendor_name"
            >
              <RouterLink
                v-if="hasPermission(['view-vendor-details'])"
                class="table-link"
                :to="{
                  name: 'vendor_basic_info',
                  params: { id: row.vendor_id },
                }"
              >
                {{ row.vendor_name }}
              </RouterLink>
              <template v-else>
                {{ row.vendor_name }}
              </template>
            </WLSRowColumn>
            <WLSRowColumn
              class="truncate_td"
              :title="row.vendor_nickname"
            >
              <span @click="showNickname(row.vendor_nickname)">
                {{ row.vendor_nickname }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn
              class="truncate_td"
              :title="row.host"
            >
              <span @click="showHost(row.host)">
                {{ row.host }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn
              class="truncate_td"
              :title="row.whitelist_ip"
            >
              <span @click="showWhitelist(row.whitelist_ip)">
                {{ row.whitelist_ip }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              {{
                row.activation == 1
                  ? translate("Activated")
                  : translate("Deactivated")
              }}
            </WLSRowColumn>
            <WLSRowColumn>{{ dateFormat(row.create_at) }}</WLSRowColumn>
          </WLSRow> -->
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', tipList.length === 0 ? 'disabled' : '']"
              :disabled="tipList.length === 0"
              type="button"
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
