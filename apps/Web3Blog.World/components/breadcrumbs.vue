<script setup lang="ts">
const { token, author, tokenid } = $defineProps<{
  token: Object
  author: Object
  tokenid: String
}>()

const fullname = $computed(() => {
  return `${author.firstname} ${author.lastname}`
})
const pages = $computed(() => {
  console.log('====> token :', token)
  return [
    { name: fullname, href: `/${author.chain}/${author.address}`, current: false },
    { name: token.name, href: `/${author.chain}/${tokenid}`, current: true },
  ]
})
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
    <!-- <time :datetime="post.datetime" class="text-sm text-gray-400">{{ post.date }}</time> -->
  </nav>
</template>
