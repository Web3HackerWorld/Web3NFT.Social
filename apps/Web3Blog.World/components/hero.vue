<script setup lang="ts">
import VueAutoWriter from 'vue-auto-writer'

const textArr = [
  {
    value: 'Get creative income with $BST',
    style: 'display: block',
  },
  {
    value: 'Permanently Store Book on Web3',
    style: 'display: block',
  },
]
</script>

<template>
  <div class="h-[calc(100vh-3.5em)]" flex-cc flex-col>
    <h2 v-motion-slide-top class="font-bold text-center mb-10 tracking-tight text-4xl text-gray-900 sm:text-7xl">
      Publish Web3 Book
    </h2>
    <h2 v-motion-slide-bottom class="font-bold text-center mb-24 tracking-tight text-2xl text-gray-900 sm:text-5xl">
      on Web3Blog.World
    </h2>
    <p class="text-center text-xl text-gray-600">
      <VueAutoWriter base-text="" :texts="textArr" />
    </p>
    <div flex-cc mt-24>
      <BsBtnBlack class="rounded-full!">
        Get Started
      </BsBtnBlack>
    </div>
  </div>
</template>
