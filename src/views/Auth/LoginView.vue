<template>
  <div class="login">
    <div class="login-container">
      <div class="card">
        <img
          alt=""
          class="logo"
          src="@/assets/img/OGlogo.png"
        />
        <div
          v-if="error"
          class="login-error"
        >
          <h5>{{ translate("LoginFailed") }}</h5>
          <p>{{ error }}</p>
        </div>
        <LanguageSwitcher />
        <form
          action=""
          class="w-full"
          @submit.prevent="processLogin"
          enctype="multipart/form-data"
        >
          <!-- <div class="form-group">
            <label for="">{{ translate("Username") }}</label>
            <div class="form-icon">
              <input
                v-model="form.username"
                autofocus
                class="form-control"
                :placeholder="translate('UsernamePlaceholder')"
                type="text"
              />
              <span class="form-icon">
                <Icon icon="solar:user-bold-duotone" />
              </span>
            </div>

            <div
              v-if="form.invalid('username')"
              class="form-error"
            >
              <span
                v-for="(error, index) in form.errors['username']"
                :key="index"
              >
                {{ error }}
              </span>
            </div>
          </div> -->
          <div class="form-group">
            <InputText
              id="username"
              v-model="form.username"
              :autofocus="true"
              :label="translate('Username')"
              :placeholder="translate('UsernamePlaceholder')"
              :required="false"
              type="text"
            >
              <InputTextAppend>
                <span class="form-icon">
                  <Icon icon="solar:user-bold-duotone" />
                </span>
              </InputTextAppend>
            </InputText>
          </div>
          <!-- <div class="form-group">
            <label for="">{{ translate("Password") }}</label>
            <div class="form-icon">
              <input
                v-model="form.password"
                class="form-control"
                :placeholder="translate('PasswordPlaceholder')"
                :type="isPasswordShown ? 'text' : 'password'"
              />
              <button
                class="form-icon"
                type="button"
                @click="isPasswordShown = !isPasswordShown"
              >
                <Icon :icon="isPasswordShown ? 'mdi:eye-off' : 'mdi:eye'" />
              </button>
            </div>
            <div
              v-if="form.invalid('password')"
              class="form-error"
            >
              <span
                v-for="(error, index) in form.errors.password"
                :key="index"
              >
                {{ error }}
              </span>
            </div>
          </div> -->
          <div class="form-group">
            <InputText
              id="password"
              v-model="form.password"
              :label="translate('Password')"
              :placeholder="translate('PasswordPlaceholder')"
              :required="false"
              :type="isPasswordShown ? 'text' : 'password'"
            >
              <InputTextAppend>
                <button
                  class="form-icon"
                  type="button"
                  @click="isPasswordShown = !isPasswordShown"
                >
                  <Icon :icon="isPasswordShown ? 'mdi:eye-off' : 'mdi:eye'" />
                </button>
              </InputTextAppend>
            </InputText>
          </div>
          <button
            class="btn btn-primary btn-block"
            type="submit"
          >
            {{ translate("SignIn") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import InputTextAppend from "@/components/InputTextAppend.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { translate } from "@/helpers/TranslationHelper";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const route = useRoute();
const redirect = route.query.redirect?.toString() ? { name: "home", query: route.query} : { name: "home" };
const isPasswordShown = ref(false);

const error = ref(null as string | null)
const form = ref({
  username: "",
  password: "",
});


const processLogin = () => {
  error.value = null
  if(form.value.password == 'admin1234' && form.value.username == 'admin'){
    console.log('log',redirect)
    router.push(redirect);
  }else{
    error.value = 'Invalid Password'
  }
};

</script>
