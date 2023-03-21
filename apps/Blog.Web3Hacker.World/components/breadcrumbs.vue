<script setup>
const pages = [
  { name: 'Web3HackerWorld', href: '/category/web3hackerworld', current: true },
]

const post
  = {
    id: 1,
    title: '解锁 Web3 的无限可能',
    href: '/unleash-the-boundary-of-web3',
    description:
    `万物皆可 Web3，我们重新定义 NFT，为 Buidlers 的 NFT 生态系统建立新的革命。Web3Hacker.World 是由 Bruce 创立的，意在创建一个以技术产品开发为基础的 Web3 的去中心化的 Web3 产业联盟组织。
组织的核心开发成员都必须是全栈 Web3 开发，有产品sences、有市场黑客运营思路、一个人可以自己产生点子到落地开发及黑客增长运营的一帮 Web3 黑客。
Bruce 在 2022 年 5 月辞职 All in Web3 后的起点是集中参加了各种 Web3 的黑客松比赛，并有幸获得了 10 多个赛道奖。
不过参与过程中想到了可以更加规模化产业化的运作的逻辑思路。于是逐渐产生了组建 Web3HackerDAO 的想法。
在 2023 年，我们改名为 Web3Hacker.World，不再叫 DAO。`,
    date: 'Mar 21, 2023',
    datetime: '2023-03-21',
    category: { title: 'Marketing', href: '/category/marketing' },
    author: {
      name: 'Bruce',
      role: 'Founder / CGO',
      href: '/user/bruce',
      imageUrl:
      '/apple-touch-icon.png',
    },
  }
</script>

<template>
  <nav class="flex justify-between items-center " aria-label="Breadcrumb">
    <ol role="list" class="flex space-x-4 items-center">
      <li>
        <div>
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
            Home
          </NuxtLink>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <svg class="flex-shrink-0 h-5 text-gray-300 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <NuxtLink :to="page.href" class="font-medium text-sm ml-4 text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">
            {{ page.name }}
          </NuxtLink>
        </div>
      </li>
    </ol>
    <time :datetime="post.datetime" class="text-sm text-gray-400">{{ post.date }}</time>
  </nav>
</template>
