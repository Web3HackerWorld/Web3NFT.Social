<script setup>
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
const postLink = post => `${post.id}-${useKebabCase(post.title)}`

const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl: '/img/bruce.jpg',
}
</script>

<template>
  <div class="py-12 sm:py-16">
    <h2 class="font-bold tracking-tight text-3xl text-gray-900 sm:text-4xl">
      Web3Blog.World
    </h2>
    <p class="mt-2 text-lg text-gray-600 leading-8">
      Your Web3 Blogging platform <br>
      With Web3 and Web2 features
    </p>
    <div class="border-t space-y-16 border-gray-200 mt-10 pt-10 sm:mt-16 sm:pt-16">
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
