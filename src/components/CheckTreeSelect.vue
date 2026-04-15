<template>
  <!-- <Treeselect
      ref="treeselectRef"
      v-model="selectedOperator"
      :clearable="true"
      :multiple="false"
      :options="operatorTree"
      :placeholder="translate('OperatorNamePlaceholder')"
      :teleport="true"
      @update:modelValue="update"
    /> -->
  <a-tree-select
    ref="antSelectTree"
    v-model:value="data"
    allow-clear
    class="treeSelect"
    :disabled="props.isDisabled"
    :dropdown-style="{
      maxHeight: '400px',
      overflow: 'auto',
    }"
    tree-checkable
    :placeholder="translate(props.placeholder)"
    style="width: 100%"
    :tree-data="props.treeData"
    tree-default-expand-all
    :show-checked-strategy="SHOW_PARENT"
    tree-node-filter-prop="label"
    @blur="unBlurIt"
    @dropdown-visible-change="(open: boolean) => (isOpen = open)"
    @focus="blurIt"
  >
  <!-- ✅ custom title -->
  <template #title="{ label }" >
    <div class="tree-node-ellipsis" style="padding-top: 5px !important;">
      <span :title="label">
        {{ label }}
      </span>
    </div>
  </template>
    <template #suffixIcon>
      <i
        :class="[
          isOpen ? 'open' : ' rotateIcon fa-solid fa-chevron-up',
          'ant-select-suffix fa-solid fa-chevron-up',
        ]"
        style="font-size: 14px"
      ></i>
    </template>
    <template #notFoundContent>
      <h1 class="text-center text-white">
        {{ translate("NoMatchingOptions") }}
      </h1>
    </template>
  </a-tree-select>
</template>

<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import { onMounted, ref, type PropType } from "vue";

import { TreeSelect } from "ant-design-vue";
import "vue3-treeselect/dist/vue3-treeselect.css";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const data = defineModel();

const props = defineProps({
  modelValue: {
    type: Number as PropType<number | null | number[]>,
    default: null,
  },
  walletType: {
    type: String,
    default: null,
  },
  except: {
    type: String as PropType<string | null>,
    default: null,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  treeData: {
    type: Array,
    default: [],
  },
});
console.log("check", props.treeData);
const isOpen = ref(false);
var operatorSelectTree: OperatorTree[];

interface OperatorTreeSelectOptions {
  id: number;
  label: string;
  children: OperatorTreeSelectOptions[] | null;
  value: number;
}
const operatorTree = ref([] as OperatorTreeSelectOptions[]);
type OperatorTree = {
  id: string;
  label: string;
  value: any;
  operator: any;
  parent: any;
  operator_parent_length: number;
  children: any;
};

const antSelectTree = ref();
const closeDropdown = () => antSelectTree.value.blur();

const blurIt = () => {
  document.querySelector("body")?.classList.add("overflow-auto", "fixed");

  console.log("Working...");
};

const unBlurIt = () => {
  document.querySelector("body")?.classList.remove("overflow-hidden", "static");
  closeDropdown();
};

onMounted(() => {
  //window.addEventListener("wheel", closeDropdown);
  closeDropdown();
});

defineExpose({
  closeDropdown,
});
</script>
<style scoped>
.custom-tree-select .ant-select-tree-dropdown {
  max-width: 200px; /* Set desired width */
  overflow: hidden; /* Hide overflowed content */
  text-overflow: ellipsis; /* Optional: Adds '...' if text is too long */
  padding-top: 10px;
}

.tree-node-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
