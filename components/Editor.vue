<script setup lang="ts">
const {
  modelValue,
  height = '200px',
} = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue: string
  height?: Number
}
// https://code-farmer-i.github.io/vue-markdown-editor/zh/api.html#left-toolbar
const leftToolbar = $ref('clear h bold italic strikethrough quote hr link image code')

const content = computed({
  get() {
    return modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  },
})
</script>

<template>
  <v-md-editor v-model="content" :left-toolbar="leftToolbar" mode="edit" :height="height" />
</template>
