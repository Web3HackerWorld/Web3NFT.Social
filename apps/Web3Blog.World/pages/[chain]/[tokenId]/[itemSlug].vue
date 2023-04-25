<script setup lang="ts">
const { appAddress: appaddress } = $(web3AuthStore())
const route = useRoute()
const chain = $computed(() => route.params.chain)
provide('chain', chain)
const tokenid = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemid = $computed(() => {
  return slug.split('-')[0]
})

const { data: item } = $(await useWeb3SupabaseData('item', $$({ chain, tokenid, itemid })))
const tokenAuthorAddress = $computed(() => useGet(item, 'address', ''))
const authorLink = () => `/${chain}/${tokenAuthorAddress}`
const theContent = $computed(() => useGet(item, 'content', {}))

const { data: author } = $(await useWeb3SupabaseData('profile', $$({ chain, appaddress, address: tokenAuthorAddress })))
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  pt-16">
    <div class="flex-1 text-base  text-gray-700 leading-7">
      <Breadcrumbs />
      <h1 class="border-b font-bold border-gray-200 my-6 tracking-tight pb-4 text-3xl text-gray-900 sm:text-4xl ">
        {{ item.title }}
      </h1>
      <div>
        <p>{{ item.excerpt }}</p>
        <BsContent v-bind="theContent" :tokenid="tokenid" :chain="chain" :appaddress="appaddress" :itemid="itemid" />
      </div>
    </div>
    <div border-t border-gray-200 my-6 pt-6>
      <div class="flex gap-x-4 relative items-center">
        <BsBoxImg :src="author.avatar" alt="" class="rounded-full bg-gray-50 h-10 w-10" />
        <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <NuxtLink :to="authorLink()">
              <span class="inset-0 absolute" />
              {{ author.firstname }}
              {{ author.lastname }}
            </NuxtLink>
          </p>
          <p class="text-gray-600">
            {{ author.bio }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.github-markdown-body{
  padding: 0
}
</style>
