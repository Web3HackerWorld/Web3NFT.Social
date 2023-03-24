<script setup lang="ts">
const { isLoading, error, doSwitchChain, isShowChainSwitchModal } = $(web3AuthStore())
</script>

<template>
  <BsDialogDefault :show="isShowChainSwitchModal">
    <div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 as="h3" class="font-medium text-lg text-gray-900 leading-6">
          Wrong Chain
        </h3>
      </div>
    </div>
    <div class="mt-5  sm:mt-6">
      <div v-show="error" class="rounded-md bg-red-50 my-4 text-center text-sm p-4 text-red-700">
        {{ error }}
      </div>
      <bs-btn-black :isLoading="isLoading" @click="doSwitchChain" class="w-full">
        Click here to Switch Chain
      </bs-btn-black>
    </div>
  </BsDialogDefault>
</template>
