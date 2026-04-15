<template>
  <div class="otp-wrapper">
    <input
      v-for="(_, index) in length"
      :key="index"
      :ref="el => (inputs[index] = el as HTMLInputElement)"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="otp-input"
      :value="digits[index]"
      @input="onInput(index, $event)"
      @keydown.backspace="onBackspace(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted  } from "vue";

const props = defineProps<{
  modelValue: string
  length?: number
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

const length = props.length ?? 6;

const digits = ref<string[]>(Array(length).fill(""));
const inputs = ref<HTMLInputElement[]>([]);

/* 🔁 Sync parent → child */
watch(
  () => props.modelValue,
  (val) => {
    console.log(val)
    digits.value = val
      ? val.split("").slice(0, length)
      : Array(length).fill("");
      if (inputs.value[val.length]) {
        inputs.value[val.length].focus();
      }
  }
);

onMounted(() => {
  inputs.value[0]?.focus();
});

/* 🔁 Sync child → parent */
watch(digits, () => {
  emit("update:modelValue", digits.value.join(""));
}, { deep: true });

const onInput = (index: number, e: Event) => {
  const input = e.target as HTMLInputElement;
  const value = input.value.replace(/[^0-9]/g, "");
 
  digits.value[index] = value;
  
  if (value && inputs.value[index + 1]) {
    inputs.value[index + 1].focus();
  }
};

const onBackspace = (index: number) => {
  if (!digits.value[index] && inputs.value[index - 1]) {
    inputs.value[index - 1].focus();
  }
};

</script>

<style scoped>
.otp-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.otp-input {
  width: 50px;           /* slightly bigger for easier tapping */
  height: 50px;          /* make it square */
  
  font-size: 25px;       /* readable */
  
  text-align: center;    /* horizontal centering */

  display: flex;         /* flex for vertical centering */
  align-items: center;   /* vertical centering */
  justify-content: center; /* horizontal centering (redundant, safe) */
  padding-top: 3px !important;

  padding: 0;            /* remove default input padding */
  box-sizing: border-box;

  border: 1px solid #ccc;
  border-radius: 8px;

  color: #000;
  background: #fff;
  caret-color:transparent;

  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.otp-input:focus {
  border-color: #067dfd;
  border: 4px solid #097efc;
  outline: none;
}

/* Optional: mobile-friendly */
@media (max-width: 400px) {
  .otp-input {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>