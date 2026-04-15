<script setup lang="ts">
import { translate } from "@/helpers/TranslationHelper";
import type { PropType } from "vue";
import { ref } from "vue";

interface ImageProp {
  name: string;
  image: string;
  size: string;
}

const props = defineProps({
  modelValue: { type: Object as PropType<ImageProp>, required: true },
  errors: { type: Array },
});
const emit = defineEmits(["update:modelValue"]);

const inputImage: any = ref(null);

const initDropArea = () => {
  if (inputImage.value) {
    inputImage.value.click();
  }
};

const handleFileInputChange = () => {
  const fileInput = inputImage.value as HTMLInputElement;

  if (fileInput.files) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && fileInput.files) {
        let image = {
          name: fileInput.files[0].name,
          image: e.target.result,
          size: (fileInput.files[0].size / 1024).toFixed(2),
        };

        emit("update:modelValue", image);
      }
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
};

const handleDrop = (event: any) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        emit("update:modelValue", e.target.result as string);
      }
    };
    reader.readAsDataURL(files[0]);
  }
};

const removeImage = () => {
  emit("update:modelValue", {});
};
</script>

<template>
  <div class="mb-2">
    <div
      v-if="!modelValue.image"
      class="bg-og-gray py-[7.5rem] text-center rounded-md cursor-pointer"
      @click="initDropArea()"
      @dragover.prevent
      @drop="handleDrop($event)"
    >
      <i class="fa fa-cloud-arrow-up !text-[#A9ABB0]"></i>
      <br />
      <span class="!text-[#A9ABB0] mb-0 block font-bold text-[14px]">
        {{ translate("DropFiles") }}
      </span>
      <span class="!text-[10px] italic !text-blue-400 font-bold text-[14px]">
        {{ translate("ImageFormat") }}
      </span>
      <input
        ref="inputImage"
        accept=".jpeg, .png, .jpg"
        hidden
        type="file"
        @change="handleFileInputChange()"
      />
    </div>
    <div
      v-if="modelValue.image"
      class="bg-og-gray p-5 text-center rounded-md mb-4 relative"
    >
      <button
        class="w-4 h-4 bg-white rounded-full flex items-center justify-center absolute top-[5px] right-[5px]"
        type="button"
        @click="removeImage()"
      >
        <i class="fa fa-times text-black text-xs"></i>
      </button>
      <img
        :src="modelValue.image"
        style="display: inline; height: 263px"
      />
    </div>
  </div>
  <div
    v-if="props.errors"
    class="form-error mb-2"
  >
    <span
      v-for="(error, index) in props.errors"
      :key="index"
    >
      {{ error }}
    </span>
  </div>
</template>
