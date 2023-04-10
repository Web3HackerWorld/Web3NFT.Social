<script setup lang="ts">
interface Props {
  isLoading?: boolean
}
const {
  isLoading,
} = defineProps<Props>()
</script>

<template>
  <BsBtnDefault :is-loading="isLoading" b-bind="$attrs" class="bg-green-400 text-white hover:bg-green-600">
    <slot />
  </BsBtnDefault>
</template>
