<script setup lang="ts">
import { ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'

// Props for parent → child
const props = defineProps<{
  modelValue: string
}>()

// Emit for child → parent
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const content = ref(props.modelValue)

// Keep sync if parent changes
watch(() => props.modelValue, (newVal) => {
  if (newVal !== content.value) {
    content.value = newVal
  }
})

// Emit updates back to parent
watch(content, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <Editor
    class="textEditor"
    v-model="content"
    api-key="idra1z2qdfmaefwybqo4d5cb0qizsyaywx2wipaly9rmfmos"
    :init="{
      height: 400,
      menubar: false, 
      statusbar: false,
      branding: false,
      plugins: 'lists link image table code',
      toolbar: 'undo redo | bold italic underline | fontfamily fontsize blocks | alignleft aligncenter alignright | bullist numlist outdent indent | code',
      content_style: 'body { background-color: #2B3343; color: #fff; }',
      
    }"
  />
</template>

<style>
/* Toolbar background */
.tox .tox-toolbar,
.tox .tox-toolbar__overflow,
.tox .tox-toolbar__primary {
  background-color: #2B3343 !important;
  border: none !important;
}

/* Buttons + icons default */
.tox .tox-tbtn,
.tox .tox-tbtn svg {
  color: #fff !important;
  fill: #fff !important;
}

/* Hover state */
.tox .tox-tbtn:hover {
  background-color: #3b4355 !important;
}

/* Active / pressed */
.tox .tox-tbtn--enabled,
.tox .tox-tbtn:active {
  background-color: #465068 !important;
}

/* Dropdown menus */
.tox .tox-menu {
  background-color: #2B3343 !important;
  color: #fff !important;
}

.tox .tox-menu svg {
  fill: #fff !important;
}

/* Borders */
.tox .tox-edit-area {
  border: 1px solid #444 !important;
}
</style>