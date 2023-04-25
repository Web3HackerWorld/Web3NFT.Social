<script setup lang="ts">
const { item, chain } = $defineProps<{
  item: Object
  chain: String
}>()

const { appAddress: appaddress } = $(web3AuthStore())

const categoryLink = post => `/category/${useGet(post, 'metadata.category')}`
const postLink = post => `/${chain}/${post.tokenid}/${post.itemid}-${useKebabCase(useGet(post, 'metadata.title'))}`

const address = $computed(() => item.address)
</script>

<template>
  <article class="flex flex-col items-start justify-between">
    <div class="flex text-xs gap-x-4 items-center">
      <time :datetime="item.created_at" class="text-gray-500"> <BsTimeAgo :time="item.created_at" /></time>
      <NuxtLink v-if="false" :to="categoryLink(post)" class="rounded-full font-medium bg-gray-50 py-1.5 px-3 text-gray-600 z-10 relative hover:bg-gray-100">
        {{ useGet(item, 'metadata.category') }}
      </NuxtLink>
    </div>
    <div class="group relative">
      <h3 class="font-semibold text-lg text-gray-900 leading-6 group-hover:text-gray-600">
        <NuxtLink :to="postLink(item)">
          <span class="inset-0 absolute" />
          {{ useGet(item, 'metadata.title') }}
        </NuxtLink>
      </h3>
      <p class="mt-5 text-sm text-gray-600 leading-6 line-clamp-3">
        {{ useGet(item, 'metadata.excerpt') }}
      </p>
    </div>
    <AuthorBox :address="address" :chain="chain" :appaddress="appaddress" />
  </article>
</template>
