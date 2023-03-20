<script setup lang="ts">
const route = useRoute()
const noBg = $computed(() => route.meta.noBg)
</script>

<template>
  <div bg-zinc-100 text-zinc-900 relative>
    <HnHeader />
    <div max-w-3xl mx-auto :class="noBg ? '' : 'bg-white'">
      <div min-h-screen>
        <div pt-1 class="-mt-1" />
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: #F4F4F5;
  margin: 0;
  padding: 0;
  color: #18181B;
  overflow-y: scroll;
}
</style>
