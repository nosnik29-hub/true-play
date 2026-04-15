<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import { translate } from "@/helpers/TranslationHelper";
import { ref } from "vue";

const streamer_link1 = ref("");
const streamer_link2 = ref("");
const streamer_link3 = ref("");

</script>

<template>
  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('FeaturedStreamer')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
				<!-- Streamer Link 1 -->
        <div class="py-[10px] flex flex-row flex-wrap gap-10" >
					<div style="min-width: 50%;">
						<InputText
            v-model="streamer_link1"
            :label="translate('StreamerLink1')"
            :placeholder="translate('StreamerLink1Placeholder')"
            type="text"
           ></InputText>
					</div>
					<button
        	  class="btn btn-success pa-0 max-h-[16px] mt-5"
        	  type="button"
        	>
        	  {{ translate("Save") }}
        	</button>
        </div>

				<!-- Streamer Link 2 -->
        <div class="py-[10px] flex flex-row flex-wrap gap-10" >
					<div style="min-width: 50%;">
						<InputText
            v-model="streamer_link2"
            :label="translate('StreamerLink2')"
            :placeholder="translate('StreamerLink2Placeholder')"
            type="text"
           ></InputText>
					</div>
					<button
        	  class="btn btn-success pa-0 max-h-[16px] mt-5"
        	  type="button"
        	>
        	  {{ translate("Save") }}
        	</button>
        </div>

				<!-- Streamer Link 3 -->
        <div class="py-[10px] flex flex-row flex-wrap gap-10" >
					<div style="min-width: 50%;">
						<InputText
            v-model="streamer_link3"
            :label="translate('StreamerLink3')"
            :placeholder="translate('StreamerLink3Placeholder')"
            type="text"
           ></InputText>
					</div>
					<button
        	  class="btn btn-success pa-0 max-h-[16px] mt-5"
        	  type="button"
        	>
        	  {{ translate("Save") }}
        	</button>
        </div>
      </main>
    </div>
  </div>
</template>
