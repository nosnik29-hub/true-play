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
import type { IPopular } from "@/interfaces/Popular";

import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();
const popularList = ref([] as IPopular[]);
const pagination = ref({} as IPagination);
const orderBy = ref({} as IOrderBy);
const isConfirmModalOpen: Ref<boolean> = ref(false);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);


const form = ref({
  game_name : "",
  streamer_name: "",
  nationality: "",
  rtp: "",
});

popularList.value = [
  {
    stream_time: "11:00 PM",
    streamer_name: "Test1",
    streamer_image: "wwww.test.com",
    nationality: "Filipino",
	  rtp: "99.0",
    status: 1,
	  create_at: new Date("2026-04-01"),
  },
  {
    stream_time: "10:00 PM",
    streamer_name: "Test2",
    streamer_image: "wwww.test.com",
    nationality: "Filipino",
	  rtp: "99.0",
    status: 1,
	  create_at: new Date("2026-04-01"),
  }
]

const callbackForConfirm = ref(() => {});

const showConfirmModal = (callback: () => void) => {
  isConfirmModalOpen.value = true;
  callbackForConfirm.value = callback;
};

const deletePopular = () => {
  toastStore.addToast({
    type: "success",
    title: translate("Success"),
  });
  isConfirmModalOpen.value = false;
};

const reset = () => {
  popularList.value = [];
  form.value.game_name = "";
  form.value.streamer_name = "";
  form.value.nationality = "";
  form.value.rtp = "";
  pagination.value = {} as IPagination;
};

const exportDataHandler = () => {
};
</script>

<template>
  <div class="card flex-auto card-main">
    <ConfirmModal
    :open="isConfirmModalOpen"
    @close="isConfirmModalOpen = false"
    @confirm="callbackForConfirm"
  ></ConfirmModal>

    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('Games')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
        <form>
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          >
            <!-- Game Name -->
            <InputText
              id="game_name"
              v-model="form.game_name"
              :label="translate('GameName')"
              :placeholder="translate('GameNamePlaceholder')"
              type="text"
            ></InputText>

            <!--  Streamer Name -->
            <InputText
              id="streamer_name"
              v-model="form.streamer_name"
              :label="translate('StreamerName')"
              :placeholder="translate('StreamerNamePlaceholder')"
              type="text"
            ></InputText>

            <!-- Nationality -->
            <InputText
              id="nationality"
              v-model="form.nationality"
              :label="translate('GameName')"
              :placeholder="translate('GameNamePlaceholder')"
              type="text"
            ></InputText>

            <!-- RTP -->
            <InputText
              id="rtp"
              v-model="form.rtp"
              :label="translate('RTP')"
              :placeholder="translate('RTPPlaceholder')"
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
          :data="popularList"
          :pagination="pagination"
          :preloader="preloader"
          @order-by="updateOrderBy"
        >
          <template #columnHeader>
            <WLSColumnHeaderItem sortKey="stream_time">
              {{ translate("GameName") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="streamer_name">
              {{ translate("StreamerName") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="streamer_image">
              {{ translate("StreamerImage") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="nationality">
              {{ translate("Natinality") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="rtp">
              {{ translate("RTP") }}
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

          <WLSRow v-slot="{ row }: { row: IPopular }">
            <WLSRowColumn>
              <span>
                {{ row.stream_time }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.streamer_name }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.streamer_image }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.nationality }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.rtp }}
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
                :tip="translate('DeleteStream')"
                tipIcon="fa-trash-can"
                @click="
                  showConfirmModal(deletePopular)
                "
              ></TooltipWrapper>
            </WLSRowColumn>
          </WLSRow>
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', popularList.length === 0 ? 'disabled' : '']"
              :disabled="popularList.length === 0"
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
