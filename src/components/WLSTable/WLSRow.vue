<template>
  <tr
    v-for="(row, index) in data1"
    :key="index"
    ref="tableBody"
    :class="index % 2 == 0 ? '' : 'bg-gray-0'"
  >
    <slot
      :index="index"
      :row="row"
    ></slot>
  </tr>
</template>

<script setup lang="ts" generic="Data">
import { inject, ref } from "vue";

// interface Props {
//   data: { [key: string]: any }[];
// }
// const props = defineProps<Props>();

const tableBody = ref<HTMLInputElement>();
// const props = defineProps<{
//   data: Data[];
// }>();
// const data2 = computed(() => instance?.parent!.props.data as Data[]);
const data1 = inject("somedata");

// onMounted(() => {
//   // data.value = computed(
//   //   () => instance?.parent!.props.data as { [key: string]: any }[]
//   // );
//   // console.log("aaa", data.value);
// });
// onUpdated(() => {
//   console.log("aa1a");
//   nextTick(() => {});
// });
</script>

<style scoped></style>
