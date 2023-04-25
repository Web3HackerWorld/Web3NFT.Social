<script setup lang="ts">
const { appAddress: appaddress } = $(web3AuthStore())
const route = useRoute()
const chain = $computed(() => route.params.chain)
const tokenid = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemid = $computed(() => {
  return slug.split('-')[0]
})

const { data: item } = $(await useWeb3SupabaseData('item', $$({ chain, tokenid, itemid })))
const address = $computed(() => useGet(item, 'address', ''))
const theContent = $computed(() => useGet(item, 'content', {}))

const { metadata: token } = $(useToken($$(tokenid)))

let author = $ref({})
watchEffect(() => {
  if (!address || !chain || !appaddress)
    return

  const { data } = $(useWeb3SupabaseData('profile', $$({ address, chain, appaddress })))
  author = data
})
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  pt-16">
    <div class="flex-1 text-base  text-gray-700 leading-7">
      <Breadcrumbs :token="token" :tokenid="tokenid" :author="author" :created-at="item.created_at" />
      <h1 class="border-b font-bold border-gray-200 my-6 tracking-tight pb-4 text-3xl text-gray-900 sm:text-4xl ">
        {{ item.title }}
      </h1>
      <div>
        <p>{{ item.excerpt }}</p>
        <BsContent v-bind="theContent" :tokenid="tokenid" :chain="chain" :appaddress="appaddress" :itemid="itemid" />
      </div>
    </div>
    <div border-t border-gray-200 my-6 pt-6>
      <AuthorBox :address="address" :chain="chain" :appaddress="appaddress" />
    </div>
  </div>
</template>

<style>
.github-markdown-body{
  padding: 0
}
</style>
