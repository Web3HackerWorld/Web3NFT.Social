<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | YaHa.Me',
  description: 'YaHa.Me: Web3 with your Blog/Story/Book/Photography/Music Creation.',
  ogImage: 'https://yaha.me/logo.png',
  ogImageAlt: 'YaHa.Me: Web3 with your Blog/Story/Book/Photography/Music Creation.',
})
</script>

<template>
  <div min-h-screen flex flex-col bg-white>
    <TheHeader />
    <div flex-1 flex flex-col px-6 lg:px-8>
      <div mx-auto w-full max-w-3xl>
        <slot />
      </div>
    </div>
    <TheFooter />
    <BsLogin />
    <BsNotification />
    <BsOnboardModal />
    <BsChainSwitchModal />
    <BsAlertDialog />
    <BsBstAllowanceModal />
    <BsTokenMintModal />
  </div>
</template>
