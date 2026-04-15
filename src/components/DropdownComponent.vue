<template>
  <a-select
    ref="antSelect"
    v-model:value="model"
    class="form-control !p-0"
    :filter-option="filterOption"
    optionLabelProp="label"
    :disabled="props.disabled"
    :options="
      props.options.map((option: any) => ({
        ...option,
        label: props.getOptionLabel(option),
        value: option.value,
      }))
    "
    show-search
    @blur="unBlurIt"
    @change="update"
    @dropdown-visible-change="(open: boolean) => (isOpen = open)"
    @focus="blurIt"
  >
    <template #suffixIcon>
      <i
        :class="[isOpen ? '' : 'rotateIcon', 'fa-solid fa-chevron-up']"
        style="font-size: 14px"
      ></i>
    </template>
    <template #optionLabel="option">
      <slot
        v-if="option?.label"
        name="optionLabel"
        v-bind="option"
      >
        {{ option.label }}
      </slot>
    </template>
    <template #option="option">
      <slot
        name="option"
        v-bind="option"
      >
        {{ option.label }}
      </slot>
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
import { onMounted, ref } from "vue";

const isOpen = ref(false);
const antSelect = ref();

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  getOptionLabel: {
    type: Function,
    default(option: any) {
      if (typeof option === "object") {
        return option.label;
      }
      return option;
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ required: true });

const emit = defineEmits(["update:modelValue"]);

const update = (value: string) => {
  emit("update:modelValue", value);
};

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const closeDropdown = () => {
  document.querySelector("body")?.classList.remove("overflow-hidden");

  antSelect.value?.blur();
};

defineExpose({ closeDropdown });

const blurIt = () => {
  document.querySelector("body")?.classList.add("overflow-auto", "fixed");
};

const unBlurIt = () => {
  document.querySelector("body")?.classList.remove("overflow-hidden", "static");
  closeDropdown();
};

onMounted(() => {
  //  window.addEventListener("wheel", closeDropdown);
  closeDropdown();
});
</script>
