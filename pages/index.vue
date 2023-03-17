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
  <div>
    <NuxtLink to="/news/1">
      news/1
    </NuxtLink>
  </div>
</template>
