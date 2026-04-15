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
import type { IGames } from "@/interfaces/Games";

import type { IOrderBy } from "@/interfaces/WLSTable";
import { useSettingStore } from "@/stores/setting";
import { useToastStore } from "@/stores/toasts";
import CreateGame from "@/views/ReportTruePlay/Games/CreateGame.vue";
import UpdateGame from "@/views/ReportTruePlay/Games/UpdateGame.vue";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

const preloader = ref(false);
const toastStore = useToastStore();

const gameList = ref([] as IGames[]);
const pagination = ref({} as IPagination);

const orderBy = ref({} as IOrderBy);

const updateOrderBy = (order_by: IOrderBy) => {
  orderBy.value = order_by;
};

const settingStore = useSettingStore();
const { language, perPage } = storeToRefs(settingStore);
const isAddGameShown = ref(false);
const isUpdateGameShown = ref(false);
const isConfirmModalOpen: Ref<boolean> = ref(false);


const form = ref({
  game_name : "",
  streamer_name: "",
  nationality: "",
  game_provider: "",
});

gameList.value = [
  {
    game_provider: "GGWP",
    stream_time: "11:00 PM",
    streamer_name: "Test 1",
    streamer_image: "wqwqwq",
    nationality: "Filipino",
	  rtp: "99.0",
	  bet_limit: "100000",
    status: 1,
  },
  {
    game_provider: "GGWP",
    stream_time: "05:00 PM",
    streamer_name: "Test 2",
    streamer_image: "wqwqwq",
    nationality: "Filipino",
	  rtp: "50.0",
	  bet_limit: "100000",
    status: 1,
  }
]
const callbackForConfirm = ref(() => {});

const showConfirmModal = (callback: () => void) => {
  isConfirmModalOpen.value = true;
  callbackForConfirm.value = callback;
};

const deleteGameType = () => {
  toastStore.addToast({
    type: "success",
    title: translate("Success"),
  });
  isConfirmModalOpen.value = false;
};

const reset = () => {
  gameList.value = [];
  form.value.game_name = "";
  form.value.streamer_name = "";
	form.value.nationality = "";
	form.value.game_provider = "";
  pagination.value = {} as IPagination;
};


const createCloseFloating = () => {
  isAddGameShown.value = false;
};

const updateCloseFloating = () => {
  isUpdateGameShown.value = false;
};

const cancel = () => {
  isAddGameShown.value = false;
  isUpdateGameShown.value = false;
};

const initCreateForm = () => {
  isAddGameShown.value = true;
};

const initUpdateForm = () => {
  isUpdateGameShown.value = true;
};

const createGameComponent = ref(null);

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
    :modalTitle="translate('AddGame')"
    :open="isAddGameShown"
    @close="createCloseFloating" 
  >
    <CreateGame
      ref="createGameComponent"
      @cancel="cancel"
      @onCreate="createCloseFloating"
    ></CreateGame>
  </ModalComponent>

  <ModalComponent
    :modalTitle="translate('UpdateGame')"
    :open="isUpdateGameShown"
    @close="createCloseFloating"
  >
    <UpdateGame
      ref="createVendorComponent"
      @cancel="cancel"
      @onUpdate="updateCloseFloating"
    ></UpdateGame>
  </ModalComponent>

  <div class="card flex-auto card-main">
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

            <!-- Game Provider -->
            <InputText
              id="game_provider"
              v-model="form.game_provider"
              :label="translate('GameProvider')"
              :placeholder="translate('GameNamePlaceholder')"
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
              {{ translate("AddGame") }}
            </button>
            <button
              v-if="hasPermission(['add-vendor'])"
              class="btn btn-success"
              type="button"
            >
              {{ translate("GameSequence") }}
            </button>
          </section>
        </form>
        <WLSTable
          :data="gameList"
          :pagination="pagination"
          :preloader="preloader"
          @order-by="updateOrderBy"
        >
          <template #columnHeader>
            <WLSColumnHeaderItem sortKey="game_provider">
              {{ translate("GameProvider") }}
            </WLSColumnHeaderItem>
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
            <WLSColumnHeaderItem sortKey="bet_limit">
              {{ translate("BetLimit") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem sortKey="status">
              {{ translate("Status") }}
            </WLSColumnHeaderItem>
            <WLSColumnHeaderItem >
              {{ translate("Action") }}
            </WLSColumnHeaderItem>
          </template>

          <WLSRow v-slot="{ row }: { row: IGames }">
            <WLSRowColumn> {{ row.game_provider }} </WLSRowColumn>
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
              <span>
                {{ row.bet_limit }}
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
              <TooltipWrapper
                :tip="translate('UpdateStream')"
                tipIcon="fa-pen"
                @click="initUpdateForm"
              ></TooltipWrapper>

              <TooltipWrapper
                :tip="translate('DeleteStream')"
                tipIcon="fa-trash-can"
                @click="
                  showConfirmModal(deleteGameType)
                "
              ></TooltipWrapper>
            </WLSRowColumn>
          </WLSRow>
          <WLSTableHeaderContainer class="border-l-2 border-[#293344]">
            <button
              v-if="hasPermission(['export-vendor'])"
              :class="['btn-export', gameList.length === 0 ? 'disabled' : '']"
              :disabled="gameList.length === 0"
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
