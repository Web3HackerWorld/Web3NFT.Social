<script setup lang="ts">
interface Props {
  isLoading?: boolean
}
const {
  isLoading,
} = defineProps<Props>()
</script>

<template>
  <button type="button" class="border rounded-md font-medium shadow-sm text-base  py-2 px-4 inline-flex justify-center items-center sm:text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:(opacity-60 cursor-not-allowed) " v-bind="$attrs">
    <div v-show="isLoading" mr-2 i-eos-icons-loading />
    <slot />
  </button>
</template>
