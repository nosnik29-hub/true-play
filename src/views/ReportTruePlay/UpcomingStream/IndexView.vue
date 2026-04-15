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
import type { IUpcomingStream } from "@/interfaces/UpcomingStream";
import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import CreateStreamer from "@/views/ReportTruePlay/UpcomingStream/CreateStream.vue";
import UpdateStreamer from "@/views/ReportTruePlay/UpcomingStream/UpdateStream.vue";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();

const upcomingStreamList = ref([] as IUpcomingStream[]);
const pagination = ref({} as IPagination);

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);
const isAddStreamerShown = ref(false);
const isUpdateStreamerShown = ref(false);
const isConfirmModalOpen: Ref<boolean> = ref(false);

const form = ref({
  stream_date : [],
  streamer_name: "",
});

const streamerList = ref([
  {
    stream_date: "03/04/26",
    stream_time: "07:00 PM",
    streamer_name: "Test1",
    avatar_urls: "www.test.com",
    game_image_urls: "www.test.com",
    status: 1,
    create_at: "03/04/26",
  },
  {
    stream_date: "03/04/26",
    stream_time: "06:00 PM",
    streamer_name: "Test2",
    avatar_urls: "www.test2.com",
    game_image_urls: "www.test2.com",
    status: 1,
    create_at: "03/04/26",
  }
])

const callbackForConfirm = ref(() => {});

const showConfirmModal = (callback: () => void) => {
  isConfirmModalOpen.value = true;
  callbackForConfirm.value = callback;
};

const deleteStreamerType = () => {
  toastStore.addToast({
    type: "success",
    title: translate("Success"),
  });
  isConfirmModalOpen.value = false;
};

const reset = () => {
  upcomingStreamList.value = [];
  form.value.stream_date = [];
  form.value.streamer_name = "";
  pagination.value = {} as IPagination;
};

const createCloseFloating = () => {
  isAddStreamerShown.value = false;
};

const updateCloseFloating = () => {
  isUpdateStreamerShown.value = false;
};

const cancel = () => {
  isAddStreamerShown.value = false;
  isUpdateStreamerShown.value = false;
};

const initCreateForm = () => {
  isAddStreamerShown.value = true;
};

const initUpdateForm = () => {
  isUpdateStreamerShown.value = true;
};


const createVendorComponent = ref(null);


const exportDataHandler = () => {
};
</script>

<template>
  <ConfirmModal
    :open="isConfirmModalOpen"
    @close="isConfirmModalOpen = false"
    @confirm="callbackForConfirm"
  ></ConfirmModal>

  <ModalComponent
    :modalTitle="translate('AddStreamer')"
    :open="isAddStreamerShown"
    @close="createCloseFloating"
  >
    <CreateStreamer
      ref="createVendorComponent"
      @cancel="cancel"
      @onCreate="createCloseFloating"
    ></CreateStreamer>
  </ModalComponent>

  <ModalComponent
    :modalTitle="translate('UpdateStream')"
    :open="isUpdateStreamerShown"
    @close="createCloseFloating"
  >
    <UpdateStreamer
      ref="createVendorComponent"
      @cancel="cancel"
      @onUpdate="updateCloseFloating"
    ></UpdateStreamer>
  </ModalComponent>

  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('UpcomingStream')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
        <form>
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          >
            <!--  Stream Date  -->
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
              id="streamer_name"
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
            <button
              v-if="hasPermission(['add-vendor'])"
              class="btn btn-success"
              type="button"
              @click="initCreateForm"
            >
              {{ translate("AddStreamer") }}
            </button>
          </section>
        </form>
        <WLSTable
          :data="streamerList"
          :pagination="pagination"
          :preloader="preloader"
          @order-by="updateOrderBy"
        >
          <template #columnHeader>
            <WLSColumnHeaderItem sortKey="stream_date">
              {{ translate("StreamDate") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="stream_time">
              {{ translate("StreamTime") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="streamer_name">
              {{ translate("StreamerName") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="avatar_urls">
              {{ translate("Avatar") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="game_image_urls">
              {{ translate("ActivationStatus") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="status">
              {{ translate("Status") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="create_at">
              {{ translate("DateCreated") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem >
              {{ translate("Action") }}
            </WLSColumnHeaderItem>
          </template>

          <WLSRow v-slot="{ row }: { row: IUpcomingStream }">
            <WLSRowColumn> {{ dateFormat(row.stream_date) }} </WLSRowColumn>
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
                {{ row.avatar_urls }}
              </span>
            </WLSRowColumn>
            <WLSRowColumn>
              <span>
                {{ row.game_image_urls }}
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
                  showConfirmModal(deleteStreamerType)
                "
              ></TooltipWrapper>
            </WLSRowColumn>
          </WLSRow>
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', upcomingStreamList.length === 0 ? 'disabled' : '']"
              :disabled="upcomingStreamList.length === 0"
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
