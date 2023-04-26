<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Web3NFT.Social',
  description: 'Web3NFT.Social: Web3 with your Blog/Story/Book/Photography/Music Creation.',
  ogImage: 'https://yaha.me/logo.png',
  ogImageAlt: 'Web3NFT.Social: Web3 with your Blog/Story/Book/Photography/Music Creation.',
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
