<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'
interface Props {
  title?: string
}
const {
  title = 'Error',
} = defineProps<Props>()
</script>

<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 text-red-400 w-5" aria-hidden="true" />
      </div>
      <div class="text-left ml-3">
        <h3 class="font-medium text-sm text-red-800">
          {{ title }}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
