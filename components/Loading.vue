<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div>
    <div v-if="isLoading" w-full flex-c py-10>
      <div text-green-500 i-svg-spinners-eclipse />
    </div>
    <slot v-else />
  </div>
</template>
