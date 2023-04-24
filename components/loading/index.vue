<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div>
    <div v-if="isLoading" w-full h-full flex-ccpy-10>
      <BsLoadingIcon mr-2 />
      <slot />
    </div>
  </div>
</template>
