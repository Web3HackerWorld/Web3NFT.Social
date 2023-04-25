<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div class="rounded-md bg-green-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon class="h-5 text-green-400 w-5" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <slot />
      </div>
    </div>
  </div>
</template>
