<script setup lang="ts">
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import { translate } from "@/helpers/TranslationHelper";
</script>

<template>
  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="user-circle.svg"
        :page-title="translate('ProfileSettings')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-8">
        <div>
          <span>{{ translate("ProfileImage") }}</span>
          <div class="border border-1 border-[#293344] p-8 w-fit rounded-md">
            <div class="relative w-[150px] h-[150px]">
              <div
                class="cursor-pointer w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center"
              >
                <img
                  class="w-[140px] h-[140px]"
                  src="@/assets/img/user-pic.png"
                />
              </div>
              <div
                class="hidden cursor-pointer absolute bottom-0 right-0 bg-[#597EB7] w-[35px] h-[35px] rounded-full flex items-center justify-center"
              >
                <i class="fa fa-camera"></i>
              </div>
              <input
                id="fileUpload"
                hidden
                type="file"
              />
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="tabContainer">
            <span class="flex gap-x-1 rounded-md shadow-sm">
              <RouterLink
                active-class=""
                class="tabPill"
                :to="{
                  name: 'profile.general',
                }"
              >
                {{ translate("General") }}
              </RouterLink>
              <RouterLink
                active-class=""
                class="tabPill"
                :to="{
                  name: 'profile.security',
                }"
              >
                {{ translate("Security") }}
              </RouterLink>
              <RouterLink
                active-class=""
                class="tabPill"
                :to="{
                  name: 'profile.logs',
                }"
              >
                {{ translate("ActivityLogs") }}
              </RouterLink>
            </span>
          </div>

          <div class="tab-content-wrapper pt-5">
            <section
              class="border border-1 p-4 rounded-md rounded-tl-none border-[#2c3342] mb-8"
            >
              <RouterView></RouterView>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
