<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import InputTextAppend from "@/components/InputTextAppend.vue";
import { translate } from "@/helpers/TranslationHelper";
import { useToastStore } from "@/stores/toasts";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const toastStore = useToastStore();
const isCurrentPasswordShown = ref(false);
const isNewPasswordShown = ref(false);
const isConfirmPasswordShown = ref(false);

const form = ref({
  current_password: "",
  new_password: "",
  confirm_password: "",
});

const updateSecurityProfile = () => {

};
</script>
<template>
  <div>
    <form @submit.prevent="updateSecurityProfile">
      <!-- <pre>{{ user }}</pre> -->
      <div
        class="mt-4 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-4 pb-[10px] sm:w-full md:w-full lg:w-1/2 xl:w-1/3"
      >
        <div class="mb-2">
          <InputText
            id="current_password"
            v-model="form.current_password"
            :label="translate('CurrentPassword')"
            :placeholder="translate('CurrentPasswordPlaceholder')"
            :required="true"
            :type="isCurrentPasswordShown ? 'text' : 'password'"
          >
            <InputTextAppend>
              <button
                class="form-icon"
                type="button"
                @click="isCurrentPasswordShown = !isCurrentPasswordShown"
              >
                <Icon
                  :icon="isCurrentPasswordShown ? 'mdi:eye-off' : 'mdi:eye'"
                />
              </button>
            </InputTextAppend>
          </InputText>
        </div>

        <div class="mb-2">
          <InputText
            id="new_password"
            v-model="form.new_password"
            :label="translate('TypeNewPassword')"
            :placeholder="translate('TypeNewPasswordPlaceholder')"
            :required="true"
            :type="isNewPasswordShown ? 'text' : 'password'"
          >
            <InputTextAppend>
              <button
                class="form-icon"
                type="button"
                @click="isNewPasswordShown = !isNewPasswordShown"
              >
                <Icon :icon="isNewPasswordShown ? 'mdi:eye-off' : 'mdi:eye'" />
              </button>
            </InputTextAppend>
          </InputText>
        </div>

        <div class="mb-2">
          <InputText
            id="confirm_password"
            v-model="form.confirm_password"
            :label="translate('ConfirmNewPassword')"
            :placeholder="translate('ConfirmNewPasswordPlaceholder')"
            :required="true"
            :type="isConfirmPasswordShown ? 'text' : 'password'"
          >
            <InputTextAppend>
              <button
                class="form-icon"
                type="button"
                @click="isConfirmPasswordShown = !isConfirmPasswordShown"
              >
                <Icon
                  :icon="isConfirmPasswordShown ? 'mdi:eye-off' : 'mdi:eye'"
                />
              </button>
            </InputTextAppend>
          </InputText>
        </div>
      </div>
      <section class="flex flex-row flex-nowrap gap-x-[20px]">
        <button
          class="btn btn-success"
          type="submit"
        >
          {{ translate("Update") }}
        </button>
      </section>
    </form>
  </div>
</template>
