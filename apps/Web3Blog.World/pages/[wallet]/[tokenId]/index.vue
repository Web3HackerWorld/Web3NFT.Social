<script setup lang="ts">
const {
  modelValue,
} = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string
}
</script>

<template>
  list all article items in this tokenId
</template>
