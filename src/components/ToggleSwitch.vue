<script setup lang="ts">
import { ref } from "vue";
const switchStatus = ref(false);
const chkStatus = () => {
  switchStatus.value = !switchStatus.value;
};
defineProps<{
  toggleLabelName: string;
}>();
</script>

<template>
  <main>
    <div class="toggle-wrapper">
      <slot name="toggleLabel">
        <label :class="['toggleSwitchLabel', switchStatus ? 'switch_On' : '']">
          {{ toggleLabelName }}
        </label>
      </slot>
      <label class="toggle">
        <input
          :checked="switchStatus"
          type="checkbox"
          @click="chkStatus"
        />
        <span class="toggler round"></span>
      </label>
    </div>
  </main>
</template>

<style scoped>
.toggle-wrapper {
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle {
  position: relative;
  display: block;
  width: 40px;
  max-width: 40px;
  height: 20px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggler {
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgb(44, 51, 66);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.toggler:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background: rgb(107, 112, 123);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .toggler {
  background: rgb(97, 125, 178);
}

input:checked + .toggler:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
  background: #fff;
}

input:focus + .toggler {
  box-shadow: 0 0 2px transparent;
}

.toggleSwitchLabel {
  color: rgba(255 255 255 / 0.3);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  white-space: nowrap;
}

.toggler.round {
  border-radius: 20px;
}

.toggler.round:before {
  border-radius: 50%;
}
.switch_On {
  color: rgba(255 255 255 / 1);
}
</style>
