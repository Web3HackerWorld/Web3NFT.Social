<script setup lang="ts">
interface Props {
  isTop?: boolean
  title?: string
  desc?: string
}
const {
  isTop,
  title,
  desc,
} = defineProps<Props>()

</script>
<template>
  <div class="space-y-6  sm:space-y-5 sm:pt-10" :class="{'pt-8': !isTop}">
    <template v-if="$slots.head">
      <slot name="head" />
    </template>
    <div v-else>
      <h3 class="font-semibold text-base text-gray-900 leading-6">
        {{ title }}
      </h3>
      <p class="mt-1 text-sm max-w-2xl text-gray-500" v-html="desc"/>
    </div>
    <div class="space-y-6 sm:space-y-5">
      <slot />
    </div>
  </div>
</template>
