<template>
    <div class="form_inputs">
      <div
        class="block text-sm font-medium text-white flex justify-between items-center"
      >
        <label
          v-if="props.label"
          :for="props.id"
        >
          {{ props.label }}
          <span v-if="props.required">&nbsp;*</span>
        </label>
        <label
          v-if="props.exact !== undefined"
          class="!font-normal !text-xs cursor-pointer"
        >
          <span class="pr-1">{{ translate("Exact") }}</span>
          <input
            :checked="props.exact"
            class="align-middle cursor-pointer"
            type="checkbox"
            @change="emitExactChange"
          />
        </label>
      </div>
  
      <div
        :class="[
          'mt-[1px]',
          hasAppend ? 'form-icon' : '',
          hasPrepend ? 'flex rounded-[5px] bg-[#2B3343] px-3' : '',
        ]"
      >
        <slot v-if="hasPrepend"></slot>
        <input
          :id="props.id"
          v-bind="attributes"
          v-model="model"
          :autocomplete="props.autocomplete"
          :autofocus="props.autofocus"
          class="form-control"
          :class="props.customClass"
          inputmode="numeric"
          @keydown="blockInvalidKeys"
          @input="sanitizeNumber"
        />
        <slot v-if="hasAppend"></slot>
      </div>
      <div
        v-if="props.errors"
        class="form-error"
      >
        <span
          v-for="(error, index) in props.errors"
          :key="index"
        >
          {{ error }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { translate } from "@/helpers/TranslationHelper";
  import { computed, useAttrs, useSlots } from "vue";
  import InputTextAppend from "./InputTextAppend.vue";
  import InputTextPrepend from "./InputTextPrepend.vue";
  defineOptions({
    inheritAttrs: false,
  });
  
  const model = defineModel();
  const attributes = useAttrs();
  const props = defineProps({
    id: String,
    label: {
      type: String,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    autocomplete: {
      type: String,
      required: false,
      default: "off",
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    customClass: String,
    errors: {
      type: Array as () => string[] | null,
      default: () => null,
    },
    convertToUppercase: {
      type: Boolean,
      required: false,
      default: false,
    },
    exact: {
      type: Boolean,
      default: undefined,
    },
  });
  
  const slots = useSlots();
  
  const hasAppend = computed(() => {
    return (
      (slots.default &&
        slots.default().some((vnode) => {
          return vnode.type === InputTextAppend;
        })) ??
      false
    );
  });
  const hasPrepend = computed(() => {
    return (
      (slots.default &&
        slots.default().some((vnode) => {
          return vnode.type === InputTextPrepend;
        })) ??
      false
    );
  });
  
  const blockInvalidKeys = (e: KeyboardEvent) => {
  const invalidKeys = ["e", "E", "+", "-", ".", ","];
      if (invalidKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    const sanitizeNumber = (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D+/g, "");
      model.value = target.value;
    };

  const emit = defineEmits(["update:exact"]);
  const emitExactChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:exact", target.checked);
  };
  </script>
  
  <style scoped></style>
  