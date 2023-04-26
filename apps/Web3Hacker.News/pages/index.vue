<script setup lang="ts">

</script>

<template>
  <div h-full>
    <div
      h-screen
      text-center
      flex flex-col
      class="-mt-14"
    >
      <h1
        font-bold flex-cc flex-col tracking-tight text-5xl text-gray-900 sm:text-6xl mt-20 class="h-3/5"
      >
        <span
          v-motion-slide-top
        >
          Stay Hungry <br>Stay Foolish
        </span>
        <br>
        <span
          v-motion-slide-bottom
        >
          永无止境<br>特立独行
        </span>
      </h1>
      <p v-motion-slide-left class="text-lg text-gray-600 leading-8">
        我们正在寻找 <br>
        <span>对世界充满好奇心的你</span><br>
        一起分享新奇的发现和有深度的思考
      </p>
      <div v-motion-slide-right class="flex flex-col mt-10 gap-x-6 items-center justify-center">
        <a href="https://zh-docs.web3hacker.world/web3hackernews" class="font-semibold text-sm  text-gray-900 leading-6" target="_blank">了解更多 <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div text-center mb-24 border-t border-t-zinc-2>
      <h1 v-motion-slide-visible-once-bottom class="font-bold mt-30 mb-20 tracking-tight text-4xl text-gray-900  sm:text-6xl">
        Web3 <br> 万物皆可 <br>无限可能
      </h1>
      <p v-motion-slide-visible-once-right class="mt-6 text-lg text-gray-600 leading-8">
        有价值的信息不会被埋没<br> 铸造在 Web3 里成为永恒
      </p>
      <div v-motion-slide-visible-once-left class="flex flex-col mt-10 gap-x-6 items-center justify-center">
        <a href="https://zh-docs.web3hacker.world/web3hackernews/features" class="font-semibold text-sm  text-gray-900 leading-6" target="_blank">了解更多 <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div class="bg-white border-t border-t-zinc-2 py-24 px-10 sm:py-32">
      <dl class="text-center grid gap-y-16 gap-x-8 grid-cols-1 lg:grid-cols-2">
        <div v-motion-slide-visible-once-top class="flex flex-col mx-auto max-w-xs gap-y-4">
          <dt class="text-base text-gray-600 leading-7">
            火热征集中
          </dt>
          <dd class="order-first font-semibold tracking-tight text-3xl text-gray-900 sm:text-5xl">
            1000 名
            <br>早期用户
          </dd>
        </div>
        <div v-motion-slide-visible-once-left class="flex flex-col mx-auto max-w-xs gap-y-4">
          <dt class="text-base text-gray-600 leading-7">
            早期参与奖励将投放
          </dt>
          <dd class="order-first font-semibold tracking-tight text-3xl text-gray-900 sm:text-5xl">
            10000 枚
            <br>$BSTs
          </dd>
        </div>
      </dl>
      <div v-motion-slide-visible-once-bottom flex-cc flex-col pt-20>
        <a href="https://zh-docs.web3hacker.world/web3hackernews/early-bird" target="_blank" class="text-lg py-3 px-8 btn">立即报名</a>
        <p text-gray-400 text-sm mt-10>
          早期种子用户将进行有条件筛选，$BSTs 只会奖励给对平台有帮助的用户
        </p>
      </div>
    </div>

    <div flex flex-col items-center lg="flex-row-reverse justify-between px-8" py-10 border-t border-t-zinc-2 px-2 text-zinc-4 text-sm>
      <div flex space-x-4 mb-4 lg:mb-0>
        <a href="/img/WeChatOffice.jpg" hover:text-green-500 target="_blank">公众号</a>
        <a href="https://twitter.com/Web3HackerWorld" hover:text-green-500 target="_blank">Twitter</a>
        <a href="https://discord.gg/anZdGZ7dhN" hover:text-green-500 target="_blank">Discord</a>
        <a href="https://t.me/Web3HackerWorld" hover:text-green-500 target="_blank">Telegram</a>
      </div>
      <div>
        ©2023 <a href="https://Web3Hacker.World" hover:text-green-500 target="_blank">Web3Hacker.World</a>
        <a href="https://zh-docs.Web3Hacker.World" hover:text-green-500 ml-4 target="_blank">文档中心</a>
      </div>
    </div>
  </div>
</template>
