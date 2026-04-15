<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import { dateFormat } from "@/helpers/DateHelper";
import { translate } from "@/helpers/TranslationHelper";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import TextEditor from '@/components/TextEditor.vue'

const lang_tab = ref(1);
const form = ref({
  en_status: 1,
	en_rules: null as any,
});

</script>

<template>
  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('BettingRules')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
    		  <div class="col-span-full ">
    		    <div class="tabContainer">
    		      <span class="flex flex-wrap gap-x-1 rounded-md shadow-sm">
    		        <a
    		          class="tabPill"
    		          v-bind:class="[lang_tab === 1 ? 'active' : '']"
    		          href="javascript:void(0);"
    		          @click="lang_tab = 1"
    		        >
    		          {{ translate("English") }}
    		        </a>
    		        <a
    		          class="tabPill"
    		          v-bind:class="[lang_tab === 2 ? 'active' : '']"
    		          href="javascript:void(0);"
    		          @click="lang_tab = 2"
    		        >
    		          {{ translate("Chinese") }}
    		        </a>
    		        <a
    		          class="tabPill"
    		          v-bind:class="[lang_tab === 3 ? 'active' : '']"
    		          href="javascript:void(0);"
    		          @click="lang_tab = 3"
    		        >
    		          {{ translate("Filipino") }}
    		        </a>
    		      </span>
    		    </div>
    		    <div>
    		      <div>
    		        <section
    		          v-if="lang_tab === 1"
    		          class="border border-1 p-4 rounded-md rounded-tl-none border-[#2c3342]"
    		        >
    		          <div class="flex flex-row flex-wrap gap-3 mb-4 ">
    		            <!-- Status -->
										<div class=" w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      							  <label>{{ translate("BettingRulesStatus") }}</label>
      							  <div class="form-control !h-[36px] !flex items-center !justify-between ">
      							    <label>
      							      {{
      							        form.en_status == 1
      							          ? translate("Activated")
      							          : translate("Deactivated")
      							      }}
      							    </label>
      							    <div class="checkbox-custom">
      							      <input
      							        v-model="form.en_status"
      							        false-value="0"
      							        true-value="1"
      							        type="checkbox"
      							      />
      							      <span class="checkbox-style"></span>
      							    </div>
      							  </div>
										</div>
    		          </div>
    		          <div class="mb-2">
    		            <label  class="labelStyle">{{ translate("Rules") }}</label>
    		             <TextEditor  v-model="form.en_rules"/>
    		          </div>
    		        </section>
							
    		        <section
    		          v-if="lang_tab === 2"
    		          class="border border-1 p-4 rounded-md rounded-tl-none border-[#2c3342]"
    		        >
									<div class="flex flex-row flex-wrap gap-3 mb-4 ">
    		            <!-- Status -->
										<div class=" w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      							  <label>{{ translate("BettingRulesStatus") }}</label>
      							  <div class="form-control !h-[36px] !flex items-center !justify-between ">
      							    <label>
      							      {{
      							        form.en_status == 1
      							          ? translate("Activated")
      							          : translate("Deactivated")
      							      }}
      							    </label>
      							    <div class="checkbox-custom">
      							      <input
      							        v-model="form.en_status"
      							        false-value="0"
      							        true-value="1"
      							        type="checkbox"
      							      />
      							      <span class="checkbox-style"></span>
      							    </div>
      							  </div>
										</div>
    		          </div>
    		          <div class="mb-2">
    		            <label  class="labelStyle">{{ translate("Rules") }}</label>
    		             <TextEditor  v-model="form.en_rules"/>
    		          </div>
    		        </section>
							
    		        <section
    		          v-if="lang_tab === 3"
    		          class="border border-1 p-4 rounded-md rounded-tl-none border-[#2c3342]"
    		        >
									<div class="flex flex-row flex-wrap gap-3 mb-4 ">
    		            <!-- Status -->
										<div class=" w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      							  <label>{{ translate("BettingRulesStatus") }}</label>
      							  <div class="form-control !h-[36px] !flex items-center !justify-between ">
      							    <label>
      							      {{
      							        form.en_status == 1
      							          ? translate("Activated")
      							          : translate("Deactivated")
      							      }}
      							    </label>
      							    <div class="checkbox-custom">
      							      <input
      							        v-model="form.en_status"
      							        false-value="0"
      							        true-value="1"
      							        type="checkbox"
      							      />
      							      <span class="checkbox-style"></span>
      							    </div>
      							  </div>
										</div>
    		          </div>
    		          <div class="mb-2">
    		            <label  class="labelStyle">{{ translate("Rules") }}</label>
    		             <TextEditor  v-model="form.en_rules"/>
    		          </div>
    		        </section>
    		      </div>
    		    </div>
    		</div>
      </main>
    </div>
  </div>
</template>
