<script setup lang="ts">
const route = useRoute()
const noBg = $computed(() => route.meta.noBg)
</script>

<template>
  <div bg-zinc-100 text-zinc-900 relative>
    <TheHeader />
    <div max-w-3xl mx-auto :class="noBg ? '' : 'bg-white'">
      <div min-h-screen>
        <div pt-1 class="-mt-1" />
        <slot />
      </div>
    </div>
  </div>
</template>
