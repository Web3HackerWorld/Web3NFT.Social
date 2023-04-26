<script setup lang="ts">
import VueAutoWriter from 'vue-auto-writer'

const textArr = [
  {
    value: 'Blog',
    style: 'display: block',
  },
  {
    value: 'Story',
    style: 'display: block',
  },
  {
    value: 'Book',
    style: 'display: block',
  },
  {
    value: 'Photography',
    style: 'display: block',
  },
  {
    value: 'Music Creation',
    style: 'display: block',
  },
]
const { chain: defaultChain, initWeb3, walletAddress } = $(web3AuthStore())
const route = useRoute()
const chain = $computed(() => route.params.chain || defaultChain)

const goToProfile = async () => {
  if (walletAddress) {
    navigateTo(`/${chain}/${walletAddress}`)
    return
  }

  await initWeb3(true)
}
</script>

<template>
  <div class="h-[calc(100vh-3.5em)]" flex-cc flex-col>
    <h2 v-motion-slide-top class="font-bold mt-14 text-center mb-24 tracking-tight text-4xl text-gray-900 sm:text-7xl">
      <div font-normal mb-20 text-6xl sm:text-8xl>
        Web3 With
      </div>
      <VueAutoWriter base-text="" :texts="textArr" :cursor-size="70" />
    </h2>
    <p v-motion-slide-bottom class="text-center text-xl text-gray-400">
      Permanently Store on Web3 <br>
      Get creation income with $BST
    </p>
    <div flex-cc mt-24>
      <BsBtnBlack class="rounded-full!" @click="goToProfile">
        Get Started
      </BsBtnBlack>
    </div>
  </div>
</template>
