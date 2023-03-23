<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
interface Props {
  title?: string
}
const {
  title = 'Attention needed',
} = defineProps<Props>()
</script>

<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 text-yellow-400 w-5" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="font-medium text-sm text-yellow-800">
          {{ title }}
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
