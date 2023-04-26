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
  privacy-policy
</template>
