<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div>
    <div v-if="isLoading" w-full h-full flex-cc py-20>
      <BsLoadingIcon mr-4 />
      Loading...
    </div>
    <slot v-else />
  </div>
</template>
