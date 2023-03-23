<script setup lang="ts">
</script>

<template>
  <div min-h-screen flex flex-col bg-white>
    <TheHeader />
    <div flex-1 flex flex-col px-6 lg:px-8>
      <slot />
    </div>
    <TheFooter />
    <BsLogin />
    <BsNotification />
  </div>
</template>
