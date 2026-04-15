<template>
  <div class="text-xs text-slate-300 mb-2">
    {{ translate("UploadCsvInstruction") }}
    <a
      class="text-blue-500 hover:underline"
      :href="getCsvLink(props.csv)"
    >
      {{ translate("CsvSampleFileLink") }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";

const props = defineProps({
  csv: { type: String, required: true },
});

const getCsvLink = (name: string) => {
  return new URL(`../../assets/csv/${name}.csv`, import.meta.url).href; // @/assets format don't work
};
</script>

<style scoped></style>
