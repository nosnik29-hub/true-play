<script setup lang="ts">
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import { translate } from "@/helpers/TranslationHelper";
import { ref, computed } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const statusOptions = [
  { value: null, label: "All" },
  { value: 1, label: "Activated" },
  { value: 0, label: "Deactivated" },
];

const form = ref({
	status: 1,
	settings: 1,
});

const included = ref<string[]>([]);
const excluded = ref<string[]>([]);

// Include Toggle
const toggleIncludeEmoji = (emoji: any) => {
  const value = emoji.i; // emoji character

  // remove if already included
  if (included.value.includes(value)) {
    included.value = included.value.filter(e => e !== value);
    excluded.value.push(value);
    return;
  }
  // default → include
  included.value.push(value);
};

// Exclude Toggle
const toggleExcludeEmoji = (emoji: any) => {
  const value = emoji.i; // emoji character

  // remove if already included
  if (excluded.value.includes(value)) {
    excluded.value = included.value.filter(e => e !== value);
    included.value.push(value);
    return;
  }
  // default → exclude
  excluded.value.push(value);
};

 const selectAllInclude = () => {
  included.value = [...new Set([
    ...included.value,
    "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊"
  ])];
  excluded.value = [];
};

const selectAllExclude = () => {
  excluded.value = [...new Set([
    ...included.value,
    "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊"
  ])];
  included.value = [];
};

const moveToInclude = () => {
	for(const data of excluded.value){
		if (!included.value.includes(data)) {
    	included.value.push(data);
 		 }
	}
	excluded.value = [];
}
 
const moveToExclude = () => {
	for(const data of included.value){
		if (!excluded.value.includes(data)) {
    	excluded.value.push(data);
 		 }
	}
	included.value = [];
}
</script>

<template>
  <div class="card flex-auto card-main">
    <div class="page">
      <PageHeaderComponent
        img-url="reports.svg"
        :menuGroup="translate('ReportTrueplay')"
        :page-title="translate('Chat')"
      ></PageHeaderComponent>

      <main class="p-[20px] flex flex-col gap-y-[2rem]">
          <div
            class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 space-y-[20px] md:space-y-0"
          >
          	<!-- Tip Level Status  -->
						<div class="form_inputs">
          	  <label>{{ translate("TipStatus") }}</label>
          	  <DropdownComponent
          	    id="activation"
          	    v-model="form.status"
          	    :get-option-label="(option: any) => translate(option.label)"
          	    :options="statusOptions"
          	  />
          	</div>

						<!-- Tip Level Settings  -->
						<div class="form_inputs">
          	  <label>{{ translate("TipSettings") }}</label>
          	  <DropdownComponent
          	    id="activation"
          	    v-model="form.status"
          	    :get-option-label="(option: any) => translate(option.label)"
          	    :options="statusOptions"
          	  />
          	</div>
          </div>
					<div class="flex flex-row w-full">
						<div class="flex flex-col border border-gray-700 pl-5 pt-2 pb-2 mb-3 pr-5 w-[40%]">
							<div class="flex justify-between items-center w-full mb-3">
								<h2 class="mt-2">{{ translate("IncludedEmojie") }}</h2>
								<button
    			          class="btn btn-success"
    			          type="button"
										@click="selectAllInclude"
    			        >
    			          {{ translate("SelectAll") }}
    			        </button>
							</div>
						
							<!-- EMOJI PICKER -->
							<div>
    						<EmojiPicker @select="toggleIncludeEmoji" />
							</div>
						
							<!-- INCLUDED -->
							<div class="section">
    					  <h3>✅ Included Emojis ({{ included.length }})</h3>
							
    					  <div class="emoji-list">
    					    <span
    					      v-for="emoji in included"
    					      :key="emoji"
    					      class="emoji included"
    					      @click="toggleIncludeEmoji({ i: emoji })"
    					    >
    					      {{ emoji }}
    					    </span>
    					  </div>
    					</div>
						</div>
					
						<div class="flex flex-col justify-center items-center pl-5 pt-2 pb-2 mb-3 pr-5 w-[10%] gap-2">
							<button
    			      class="btn btn-success w-[35px]"
    			      type="button"
								@click="moveToExclude"
    			    >
    			      >
    			    </button>
							<button
    			      class="btn btn-success  w-[35px]"
    			      type="button"
								@click="moveToInclude"
    			    >
    			      <
    			    </button>
						</div>	
					
						<div class="flex flex-col border border-gray-700 pl-5 pt-2 pb-2 mb-3 pr-5 w-[40%]">
							<div class="flex justify-between items-center w-full mb-3">
								<h2 class="mt-2">{{ translate("ExcludedEmojie") }}</h2>
								<button
    			          class="btn btn-success"
    			          type="button"
										@click="selectAllExclude"
    			        >
    			          {{ translate("SelectAll") }}
    			        </button>
							</div>
						
							<!-- EMOJI PICKER -->
							<div>
    						<EmojiPicker @select="toggleExcludeEmoji" />
							</div>
						
							<!-- INCLUDED -->
							<div class="section">
    					  <h3>✅ Excluded Emojis ({{ included.length }})</h3>
							
    					  <div class="emoji-list">
    					    <span
    					      v-for="emoji in excluded"
    					      :key="emoji"
    					      class="emoji excluded"
    					      @click="toggleExcludeEmoji({ i: emoji })"
    					    >
    					      {{ emoji }}
    					    </span>
    					  </div>
    					</div>
						</div>	
					</div>			

	
      </main>
    </div>
  </div>
</template>

<style scoped>
.emoji-manager {
  max-width: 600px;
}

.actions {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
  padding: 6px 12px;
  cursor: pointer;
}

.section {
  margin-top: 20px;
}

.emoji-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.emoji {
  font-size: 24px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}

.included {
  background: #1f8b4c33;
}

.excluded {
  background: #ff4d4f33;
}
</style>
