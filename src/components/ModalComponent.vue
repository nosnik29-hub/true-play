<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref } from "vue";

defineProps<{
  modalTitle: string;
  open: boolean;
  specialClass?: string;
}>();

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const initialFocus = ref(null);
</script>

<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-[12]"
      :initialFocus="initialFocus"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-1000"
        enter-from="opacity-0"
        enter-to="opacity-300"
        leave="ease-in duration-1000"
        leave-from="opacity-300"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      </TransitionChild>

      <div
        ref="initialFocus"
        class="fixed inset-0 w-screen overflow-y-auto"
      >
        <div
          class="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="transition-all ease-out duration-1000"
            enter-from="origin-center scale-1 opacity-0 fixed -top-[100%] -translate-y-[50%]"
            enter-to="origin-center scale-1 opacity-1 fixed top-[50%] -translate-y-[50%]"
            leave="transition-all ease-in duration-1000"
            leave-from="origin-center scale-1 opacity-1 fixed top-[50%] -translate-y-[50%]"
            leave-to="origin-center scale-1 opacity-0 fixed -top-[100%] -translate-y-[50%]"
          >
            <DialogPanel :class="['modal-inner', specialClass]">
              <DialogTitle
                as="div"
                class="modal-header"
              >
                <span class="font-bold text-[20px]">{{ modalTitle }}</span>
                <i
                  class="text-[26px] cursor-pointer text-[#909297] font-100 far fa-times-circle"
                  @click="closeModal"
                ></i>
              </DialogTitle>

              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: rgba(0 0 0 / 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-inner {
  max-width: 450px;
  width: 100%;
  height: auto;
  background: rgb(33, 37, 46);
  opacity: 1;
  z-index: 13;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  border-radius: 10px;
  color: #ffffff;
}

.alertModal {
  max-width: 500px;
  width: calc(100% - 2rem);
  height: 250px;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: calc(100% - 50%);
  margin-top: -125px;
  border-radius: 10px;
  box-shadow:
    rgba(4, 9, 20, 0.03) 0px 0.46875rem 2.1875rem,
    rgba(4, 9, 20, 0.03) 0px 0.9375rem 1.40625rem,
    rgba(4, 9, 20, 0.05) 0px 0.25rem 0.53125rem,
    rgba(4, 9, 20, 0.03) 0px 0.125rem 0.1875rem;
}
.modal-header {
  background: transparent;
  height: 50px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #566785 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1;
}

.dropin-enter-active,
.dropin-leave-active {
  transition: transform 1.5s ease;
}

.dropin-enter-from,
.dropin-leave-to {
  transform: translateY(-200%);
}

.zoom-enter-from {
  transform: scale(1.5);
}
.zoom-enter-to {
  transform: scale(1) translateY(0%);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.25s ease-in;
}

.zoom-leave-from {
  transform: scale(1) translateY(0%);
}
.zoom-leave-to {
  transform: scale(0.8);
}
</style>
