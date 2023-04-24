<script setup lang="ts">
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
