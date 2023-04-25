<script setup>
import VueAutoWriter from 'vue-auto-writer'

await $fetch('/api/web3/test', {
  method: 'POST',
  body: {

  },
})

const client = useSupabaseClient()

const { data: posts } = $(await useAsyncData('restaurant', async () => {
  const { data } = await client.from('web3Creation').select().order('created_at', { ascending: false })
  return $$(data)
}))

const categoryLink = cat => `/category/${cat}`
const postLink = post => `/chain/${post.tokenId}/${post.id}-${useKebabCase(post.title)}`

const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl: '/img/bruce.jpg',
}

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
  <div>
    <div class="h-[calc(100vh-3.5em)]" flex-cc flex-col>
      <h2 v-motion-slide-top class="font-bold text-center mb-5 tracking-tight text-4xl text-gray-900 sm:text-7xl">
        Publish Web3 Book
      </h2>
      <h2 v-motion-slide-bottom class="font-bold text-center text-xl mb-4 tracking-tight text-gray-900 sm:text-3xl">
        on Web3Blog.World
      </h2>
      <p class="mt-2 text-center text-xl text-gray-600">
        <VueAutoWriter base-text="" :texts="textArr" />
      </p>
      <div flex-cc mt-10>
        <BsBtnBlack class="rounded-3xl! text-xl! py-3! px-8!">
          Get Started
        </BsBtnBlack>
      </div>
    </div>
    <div class="border-t space-y-16 border-gray-200 mt-10 pt-10 hidden sm:mt-16 sm:pt-16">
      <article v-for="post in posts" :key="post.id" class="flex flex-col items-start justify-between">
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
</template>
