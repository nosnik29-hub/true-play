<template>
  <a-select
    v-model:value="selectedValue"
    class="form-control !p-0 text-white h-[36px]"
    :options="
      activityList.map((option: string) => ({
        label: translate(option),
        value: option,
      }))
    "
    :placeholder="translate('ActivityPlaceholder')"
    show-search
    @change="update"
    @dropdown-visible-change="(open: boolean) => (isOpen = open)"
  >
    <template #suffixIcon>
      <i
        :class="[isOpen ? '' : 'rotateIcon', 'fa-solid fa-chevron-up']"
        style="font-size: 14px"
      ></i>
    </template>
    <template #notFoundContent>
      <h1 class="text-center text-white">
        {{ translate("NoMatchingOptions") }}
      </h1>
    </template>
  </a-select>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { nextTick, onMounted, onUpdated, ref, toRef } from "vue";
const isOpen = ref(false);
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const initialValue = toRef(props, "modelValue");

const selectedValue = ref(initialValue.value as string | null);

onUpdated(() => {
  nextTick(() => {
    selectedValue.value = initialValue.value;
  });
});

const activityList = ref([
  "Successful Login",
  "Failed Login",
  "Successful Create Operator",
  "Failed Create Operator",
  "Successful Create Operator User",
  "Failed Create Operator User",
  "Successful Edit Operator Basic Details",
  "Failed Edit Operator Basic Details",
  "Successful Operator Bulk Update",
  "Failed Operator Bulk Update",
  "Successful Transfer Operator",
  "Failed Transfer Operator",
  "Successful Create Vendor",
  "Failed Create Vendor",
  "Successful Create Vendor User",
  "Failed Create Vendor User",
  "Successful Edit Vendor Basic Details",
  "Failed Edit Vendor Basic Details",
  "Successful Enable Player",
  "Failed Enable Player",
  "Successful Disable Player",
  "Failed Disable Player",
  "Successful Create Bet Limit",
  "Failed Create Bet Limit",
  "Successful Update Bet Limit",
  "Failed Update Bet Limit",
  "Successful Create User",
  "Failed Create User",
  "Successful Update User",
  "Failed Update User",
  "Successful Create Role",
  "Failed Create Role",
  "Successful Update Role",
  "Failed Update Role",
  "Successful Update Role Permissions",
  "Successful Delete Role",
  "Failed Delete Role",
  "Successful Delete Sub Game Type",
  "Failed Delete Sub Game Type",
  "Successful Export Report",
  "Failed Export Report",
  "Successful Download Report",
  "Failed Download Report",
  "Successful Create Image",
  "Failed Create Image",
  "Successful Export Game Report",
  "Successful Add Game to Operator",
  "Failed Add Game to Operator",
  "Successful Remove Game to Operator",
  "Failed Remove Game to Operator",
  "Successful Add Sub Game Type to Operator",
  "Failed Add Sub Game Type to Operator",
  "Successful Remove Sub Game Type to Operator",
  "Failed Remove Sub Game Type to Operator",
  "Successful Add Bet Limit to Operator",
  "Failed Add Bet Limit to Operator",
  "Successful Remove Bet Limit to Operator",
  "Failed Remove Bet Limit to Operator",
  "Successful Reset Operator Private Key",
  "Failed Reset Operator Private Key",
  "Successful Reset Operator Public Key",
  "Failed Reset Operator Public Key",
  "Successful Reset Vendor Private Key",
  "Failed Reset Vendor Private Key",
  "Successful Reset Vendor Public Key",
  "Failed Reset Vendor Public Key",
  "Successful Create Media Component",
  "Failed Create Media Component",
  "Successful Update Media Component",
  "Failed Update Media Component",
  "Successful Delete Media Component",
  "Failed Delete Media Component",
  "Successful Upload Media Component Image",
  "Failed Upload Media Component Image",
  "Successful Update Media Component Image Details",
  "Failed Update Media Component Image Details",
  "Successful Delete Media Component Image",
  "Failed Delete Media Component Image",
  "Successful Reset User Password",
  "Failed Reset User Password",
  "Successful Delete Bet Limit",
  "Failed Delete Bet Limit",
  "Successful Update Image",
  "Failed Update Image",
  "Successful Delete Image",
  "Failed Delete Image",
  "Successful Create Sub Game Type",
  "Failed Create Sub Game Type",
  "Successful Update Sub Game Type",
  "Failed Update Sub Game Type",
  "Successful Create Game",
  "Failed Create Game",
  "Successful Update Game",
  "Failed Update Game",
  "Successful Delete Game",
  "Failed Delete Game",
  "Successful Create Promo",
  "Failed Create Promo",
  "Successful Update Promo",
  "Failed Update Promo",
  "Successful Delete Promo",
  "Failed Delete Promo",
  "Successful Create Promo Batch",
  "Failed Create Promo Batch",
  "Successful Update Promo Batch",
  "Failed Update Promo Batch",
  "Successful Delete Promo Batch",
  "Failed Delete Promo Batch",
  "Successful Create Sub Game",
  "Failed Create Sub Game",
  "Successful Update Sub Game",
  "Failed Update Sub Game",
  "Successful Delete Sub Game",
  "Failed Delete Sub Game",
  "Failed Export Player",
  "Failed Export Operator",
  "Failed Export Vendor",
  "Failed Export Game",
  "Failed Export Sub Game Type",
  "Failed Export Bet Limit",
  "Failed Export Currency",
  "Failed Export Betting Transaction History",
  "Failed Export Transfer Transaction History",
  "Failed Export Player Cash Flow Records",
  "Failed Export Promo Report",
  "Failed Export Game Report",
  "Failed Export Operator Summary",
  "Failed Export Vendor Summary",
  "Failed Export Player Summary",
  "Failed Export Sports Betting Transaction",
  "Successful Create Announcement",
  "Failed Create Announcement",
  "Successful Update Announcement",
  "Failed Update Announcement",
  "Successful Hide Announcement",
  "Failed Hide Announcement",
  "Successful Show Announcement",
  "Failed Show Announcement",
  "Successful Update Apollo Maintenance",
  "Failed Update Apollo Maintenance",
  "Successful Update Hera Maintenance",
  "Failed Update Hera Maintenance",
]);
onMounted(() => {
  // activityList.value.sort((a, b) => {
  //   return -1;
  //   console.log("vaaa", a);
  //   console.log("vbbbb", b);
  //   return translate(a) - translate(b);
  // });
  activityList.value.sort();
});

onUpdated(() => {
  console.log("aaaasdsf");
  // activityList.value.sort((a, b) => {
  //   return -1;
  //   console.log("vaaa", a);
  //   return translate(a) - translate(b);
  // });
});
const emit = defineEmits(["update:modelValue"]);

const update = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<style scoped></style>
