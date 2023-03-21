<script setup lang="ts">
</script>

<template>
  <div min-h-screen flex flex-col bg-white px-6 lg:px-8>
    <div flex-1 flex flex-col>
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
