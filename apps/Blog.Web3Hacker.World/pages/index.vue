<script setup>
const user = $(useSupabaseUser())
const client = useSupabaseClient()

const { data: posts } = $(await useAsyncData('restaurant', async () => {
  const { data } = await client.from('web3Creation').select().order('created_at', 'desc')
  return $$(data)
}))

const categoryLink = cat => `/category/${cat}`
const postLink = post => `${post.id}-${useKebabCase(post.title)}`
// const posts = [
//   {
//     id: 1,
//     title: '解锁 Web3 的无限可能',
//     href: '/unleash-the-boundary-of-web3',
//     description:
//       `万物皆可 Web3，我们重新定义 NFT，为 Buidlers 的 NFT 生态系统建立新的革命。Web3Hacker.World 是由 Bruce 创立的，意在创建一个以技术产品开发为基础的 Web3 的去中心化的 Web3 产业联盟组织。
// 组织的核心开发成员都必须是全栈 Web3 开发，有产品sences、有市场黑客运营思路、一个人可以自己产生点子到落地开发及黑客增长运营的一帮 Web3 黑客。
// Bruce 在 2022 年 5 月辞职 All in Web3 后的起点是集中参加了各种 Web3 的黑客松比赛，并有幸获得了 10 多个赛道奖。
// 不过参与过程中想到了可以更加规模化产业化的运作的逻辑思路。于是逐渐产生了组建 Web3HackerDAO 的想法。
// 在 2023 年，我们改名为 Web3Hacker.World，不再叫 DAO。`,
//     date: 'Mar 21, 2023',
//     datetime: '2023-03-21',
//     category: { title: 'Web3HackerWorld', href: '/category/web3hackerworld' },
//     author: {
//       name: 'Bruce',
//       role: 'Founder / Web3Hacker',
//       href: '/user/bruce',
//       imageUrl:
//         '/img/bruce.jpg',
//     },
//   },
// ]

const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl: '/img/bruce.jpg',
}
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div class="mx-auto max-w-3xl py-12 sm:py-16">
      <h2 class="font-bold tracking-tight text-3xl text-gray-900 sm:text-4xl">
        Web3Hacker.World
      </h2>
      <p class="mt-2 text-lg text-gray-600 leading-8">
        解锁 Web3 的无限可能 <br>
        万物皆可 Web3，我们重新定义 NFT，为 Buidlers 的 NFT 生态系统建立新的革命
      </p>
      <div class="border-t space-y-16 border-gray-200 mt-10 pt-10 sm:mt-16 sm:pt-16">
        <article v-for="post in posts" :key="post.id" class="flex flex-col max-w-xl items-start justify-between">
          <div class="flex text-xs gap-x-4 items-center">
            <time :datetime="post.created_at" class="text-gray-500">{{ post.created_at }}</time>
            <NuxtLink :to="categoryLink(post.category)" class="rounded-full font-medium bg-gray-50 py-1.5 px-3 text-gray-600 z-10 relative hover:bg-gray-100">
              {{ post.category }}
            </NuxtLink>
          </div>
          <div class="group relative">
            <h3 class="font-semibold mt-3 text-lg text-gray-900 leading-6 group-hover:text-gray-600">
              <NuxtLink :to="postLink(post)">
                <span class="inset-0 absolute" />
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="mt-5 text-sm text-gray-600 leading-6 line-clamp-3">
              {{ post.excerpt }}
            </p>
          </div>
          <div class="flex mt-8 gap-x-4 relative items-center">
            <img :src="author.imageUrl" alt="" class="rounded-full bg-gray-50 h-10 w-10">
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a :href="author.href">
                  <span class="inset-0 absolute" />
                  {{ author.name }}
                </a>
              </p>
              <p class="text-gray-600">
                {{ author.role }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
