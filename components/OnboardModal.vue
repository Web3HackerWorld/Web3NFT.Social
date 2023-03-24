<script setup lang="ts">
const { doOnboard, isShowOnboardModal } = $(web3AuthStore())
</script>

<template>
  <BsDialogDefault :show="isShowOnboardModal" @close="isShowOnboardModal = false">
    <div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="font-medium text-lg text-gray-900 leading-6">
          MetaMask Required
        </h3>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <bs-btn-black class="mb-4 w-full" @click="doOnboard">
        Click here to install MetaMask
      </bs-btn-black>
      <bs-btn-plain class="w-full" @click="isShowOnboardModal = false">
        Cancel Login
      </bs-btn-plain>
    </div>
  </BsDialogDefault>
</template>
