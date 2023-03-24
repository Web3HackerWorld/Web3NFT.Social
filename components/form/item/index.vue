<script setup lang="ts">
interface Props {
  for?: string
  label?: string
}
const props = defineProps<Props>()
</script>

<template>
  <label :for="props.for" class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
    <span class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">{{ props.label }}</span>
    <div class="mt-2 sm:mt-0 sm:col-span-2">
      <slot />
    </div>
  </label>
</template>
