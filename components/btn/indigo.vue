<script setup lang="ts">
interface Props {
  isLoading?: boolean
}
const {
  isLoading,
} = defineProps<Props>()
</script>
<template>
  <BsBtnDefault :is-loading="isLoading" b-bind="$attrs" class="bg-indigo-600 text-base text-white  hover:bg-indigo-700" :disabled="isLoading">
    <slot />
  </BsBtnDefault>
</template>
