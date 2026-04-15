<template>
  <Datepicker
    ref="datepicker"
    v-model="dateRangePickerValue"
    :cancelText="translate('Cancel')"
    :dark="true"
    :enable-seconds="true"
    :enable-time-picker="enableTimePicker"
    format="yyyy/MM/dd HH:mm:ss"
    :input-class-name="inputClassName"
    :locales="language"
    model-type="yyyy-MM-dd HH:mm:ss"
    multi-calendars
    :partial-range="false"
    :placeholder="placeholder"
    range
    :readonly="readonly"
    :selectText="translate('Apply')"
    :startTime="[
      { hours: 0, minutes: 0, seconds: 0 },
      { hours: 23, minutes: 59, seconds: 59 },
    ]"
    :teleport="true"
  >
    <template
      v-if="props.enableSideBar"
      #left-sidebar
    >
      <div
        v-for="preset in DateRangePreset"
        :key="preset.label"
        class="w-[148px] flex flex-col whitespace-nowrap items-start justify-center text-white"
      >
        <div
          class="presetDatesLabel"
          @click="changeDateRangePickerValue(preset.value)"
        >
          {{ translate(preset.label) }}
        </div>
      </div>
    </template>
  </Datepicker>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/stores/setting";
import Datepicker, { type DatePickerInstance } from "@vuepic/vue-datepicker";
import { storeToRefs } from "pinia";

import { translate } from "@/helpers/TranslationHelper";
import moment from "moment";
import { nextTick, onUpdated, ref, toRef, watch, type PropType } from "vue";
const datepicker = ref<DatePickerInstance>(null);
const DateRangePreset = ref([] as PresetDateRangeInterface[]);
interface PresetDateRangeInterface {
  value: DateRangeValue;
  label: string;
}

interface DateRangeValue {
  dateFrom: string;
  dateTo: string;
}
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  inputClassName: {
    type: String,
    default: "",
  },
  enableTimePicker: {
    type: Boolean,
    default: false,
  },
  enableSideBar: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  timezone: {
    type: String,
    default: "Asia/Manila",
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: [] as string[],
  },
});
// const dateRangePickerValue = ref(props.modelValue as string[]);
const initialValue = toRef(props, "modelValue");
const dateRangePickerValue = ref(initialValue.value as string[]);

const changeDateRangePickerValue = (value: DateRangeValue) => {
  dateRangePickerValue.value = [value.dateFrom, value.dateTo];
  emit("update:modelValue", dateRangePickerValue.value);
  datepicker.value?.closeMenu();
};

const emit = defineEmits(["update:modelValue"]);

const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

watch(dateRangePickerValue, () => {
  emit("update:modelValue", dateRangePickerValue.value);
});

const generatePresetDates = () => {
  DateRangePreset.value = [
    {
      value: {
        dateFrom: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "Today",
    },
    {
      value: {
        dateFrom: moment()
          .subtract(1, "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment()
          .subtract(1, "days")
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "Yesterday",
    },
    {
      value: {
        dateFrom: moment().startOf("isoWeek").format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment().endOf("isoWeek").format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "ThisWeek",
    },
    {
      value: {
        dateFrom: moment()
          .subtract(1, "weeks")
          .startOf("isoWeek")
          .format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "LastWeek",
    },
    {
      value: {
        dateFrom: moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "ThisMonth",
    },
    {
      value: {
        dateFrom: moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "LastMonth",
    },
    {
      value: {
        dateFrom: moment()
          .subtract(2, "months")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment()
          .subtract(2, "months")
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      label: "Last2Months",
    },
  ];
};
generatePresetDates();

onUpdated(() => {
  nextTick(() => (dateRangePickerValue.value = props.modelValue));
});

watch(language, () => {
  setTimeout(() => {
    generatePresetDates();
  }, 50);
});
</script>
