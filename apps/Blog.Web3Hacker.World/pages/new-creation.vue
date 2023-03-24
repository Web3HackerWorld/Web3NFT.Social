<script setup>
const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl:
    '/img/bruce.jpg',
}

const title = $ref('解锁 Web3 的无限可能')
const excerpt = $ref(`Web3Hacker.World 是由 Bruce 创立的，意在创建一个以技术产品开发为基础的 Web3 的去中心化的 Web3 产业联盟组织。
组织的核心开发成员都必须是全栈 Web3 开发，有产品sences、有市场黑客运营思路、一个人可以自己产生点子到落地开发及黑客增长运营的一帮 Web3 黑客。
Bruce 在 2022 年 5 月辞职 All in Web3 后的起点是集中参加了各种 Web3 的黑客松比赛，并有幸获得了 10 多个赛道奖。
不过参与过程中想到了可以更加规模化产业化的运作的逻辑思路。于是逐渐产生了组建 Web3HackerDAO 的想法。
在 2023 年，我们改名为 Web3Hacker.World，不再叫 DAO。`)
const content = $ref('解锁 Web3 的无限可能')
const reward = $ref('解锁 Web3 的无限可能')
const doSubmit = async () => {

}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  w-full max-w-2xl pt-16">
    <div class="flex-1  text-base text-gray-700 leading-7">
      <Breadcrumbs />
      <input class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 text-3xl text-gray-900 sm:text-4xl" $="title" placeholder="Your creation title here">
      <div mt-10>
        <resize-textarea
          id="excerpt"
          v-model="excerpt"
          class="rounded-md border-gray-300 shadow-sm w-full p-4 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Write some excerpt"
          :rows="2"
          :cols="4"
        />
      </div>
      <div mt-10>
        <BsEditor v-model="content" />
      </div>
    </div>
  </div>
</template>
