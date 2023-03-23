<script setup lang="ts">
interface Props {
  isLoading?: boolean
}
const {
  isLoading,
} = defineProps<Props>()
</script>

<template>
  <BsBtnDefault :disabled="isLoading" :is-loading="isLoading" class="bg-gray-900 text-white hover:bg-gray-700">
    <slot />
  </BsBtnDefault>
</template>
