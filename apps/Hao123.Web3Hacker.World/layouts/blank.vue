<script setup lang="ts">
const route = useRoute()
const noBg = $computed(() => route.meta.noBg)
</script>

<template>
  <div bg-zinc-100 text-zinc-900 relative>
    <slot />
  </div>
</template>

<style>

</style>
