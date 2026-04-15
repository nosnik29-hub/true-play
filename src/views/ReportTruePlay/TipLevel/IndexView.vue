<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
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
import type { ITipLevel} from "@/interfaces/TipLevel";

import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import CreateLevel from "@/views/ReportTruePlay/TipLevel/CreateTiplevel.vue";
import UpdateLevel from "@/views/ReportTruePlay/TipLevel/UpdateTipLevel.vue";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();

const tipLevelList = ref([] as ITipLevel[]);
const pagination = ref({} as IPagination);

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);
const isAddLevelShown = ref(false);
const isUpdateLevelShown = ref(false);
const isConfirmModalOpen: Ref<boolean> = ref(false);

const statusOptions = [
  { value: null, label: "All" },
  { value: 1, label: "Activated" },
  { value: 0, label: "Deactivated" },
];

const form = ref({
	status: 1,
	settings: 1,
});

tipLevelList.value = [
  {
    level_no: 1,
    level_amount: 100000,
    privilege: "SVIP",
    status: 1,
	  create_at: new Date("2026-04-01"),
  },
  {
    level_no: 2,
    level_amount: 50000,
    privilege: "VIP",
    status: 1,
	  create_at: new Date("2026-04-01"),
  }
]

const callbackForConfirm = ref(() => {});

const showConfirmModal = (callback: () => void) => {
  isConfirmModalOpen.value = true;
  callbackForConfirm.value = callback;
};

const deleteTipLevel = () => {
  toastStore.addToast({
    type: "success",
    title: translate("Success"),
  });
  isConfirmModalOpen.value = false;
};
const reset = () => {
  tipLevelList.value = [];
  form.value.status = 1;
  form.value.settings = 1;
  pagination.value = {} as IPagination;
};

const createCloseFloating = () => {
  isAddLevelShown.value = false;
};

const updateCloseFloating = () => {
  isUpdateLevelShown.value = false;
};

const cancel = () => {
  isAddLevelShown.value = false;
};

const initCreateForm = () => {
  isAddLevelShown.value = true;
};

const initUpdateForm = () => {
  isUpdateLevelShown.value = true;
};

const createLevelComponent = ref(null);

</script>

<template>

  <ConfirmModal
    :open="isConfirmModalOpen"
    @close="isConfirmModalOpen = false"
    @confirm="callbackForConfirm"
  ></ConfirmModal>

  <ModalComponent
    :modalTitle="translate('AddLevel')"
    :open="isAddLevelShown"
    @close="createCloseFloating"
  >
    <CreateLevel
      ref="createLevelComponent"
      @cancel="cancel"
      @onCreate="createCloseFloating"
    ></CreateLevel>
  </ModalComponent>

  <ModalComponent
    :modalTitle="translate('UpdateStream')"
    :open="isUpdateLevelShown"
    @close="createCloseFloating"
  >
    <UpdateLevel
      ref="createVendorComponent"
      @cancel="cancel"
      @onUpdate="updateCloseFloating"
    ></UpdateLevel>
  </ModalComponent>

  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('TipLevel')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
        <form>
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          >
          	<!-- Tip Level Status  -->
						<div class="form_inputs">
          	  <label>{{ translate("TipStatus") }}</label>
          	  <DropdownComponent
          	      id="activation"
          	      v-model="form.status"
          	      :get-option-label="(option: any) => translate(option.label)"
          	      :options="statusOptions"
          	  />
          	</div>

						<!-- Tip Level Settings  -->
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
              {{ translate("AddLevel") }}
            </button>
          </section>
        </form>
        <WLSTable
          :data="tipLevelList"
          :pagination="pagination"
          :preloader="preloader"
          @order-by="updateOrderBy"
        >
          <template #columnHeader>
            <WLSColumnHeaderItem sortKey="level_no">
              {{ translate("LevelNo") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="level_amount">
              {{ translate("LevelAmount") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="privilege">
              {{ translate("Privilege") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="status">
              {{ translate("Status") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="create_at">
              {{ translate("CreatedDate") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem >
              {{ translate("Action") }}
            </WLSColumnHeaderItem>
          </template>

          <WLSRow v-slot="{ row }: { row: ITipLevel }">
            <WLSRowColumn>
              <span>
                {{ row.level_no }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.level_amount }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.privilege }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              {{
                row.status == 1
                  ? translate("Activated")
                  : translate("Deactivated")
              }}
            </WLSRowColumn>
            <WLSRowColumn>{{ dateFormat(row.create_at) }}</WLSRowColumn>
            <WLSRowColumn>
              <TooltipWrapper
                :tip="translate('UpdateStream')"
                tipIcon="fa-pen"
                @click="initUpdateForm"
              ></TooltipWrapper>

              <TooltipWrapper
                :tip="translate('DeleteStream')"
                tipIcon="fa-trash-can"
                @click="
                  showConfirmModal(deleteTipLevel)
                "
              ></TooltipWrapper>
            </WLSRowColumn>
          </WLSRow>
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', tipLevelList.length === 0 ? 'disabled' : '']"
              :disabled="tipLevelList.length === 0"
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
