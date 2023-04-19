<script setup lang="ts">
const { appAddress: appaddress } = $(web3AuthStore())
const { supabase } = $(supabaseStore())

const route = useRoute()
const chain = $computed(() => route.params.chain)
const tokenid = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemid = $computed(() => {
  return slug.split('-')[0]
})

const { data: dataItem } = $(await useWeb3SupabaseData('item', $$({ chain, tokenid, itemid })))
const item = $computed(() => useGet(dataItem, 'metadata', {}))
const tokenAuthorAddress = $computed(() => useGet(dataItem, 'address', ''))
const condition = $computed(() => useGet(item, 'content.condition', false))
const content = $computed(() => condition ? useGet(item, 'content.decryptedContent', '') : item.content)
const authorLink = () => `/${chain}/${tokenAuthorAddress}`

let author = $ref({})
watchEffect(async () => {
  if (!tokenAuthorAddress)
    return

  const { data } = $(await useWeb3SupabaseData('profile', $$({ chain, appaddress, address: tokenAuthorAddress })))
  author = useGet(data, 'metadata', {})
})

let isLoading = $ref(false)
let status = $ref('')
const doMintNFT = async () => {
  isLoading = true
  status = 'mint nft'
  addSuccess('Mint NFT success')
  isLoading = false
}
const doMintSBT = async () => {
  isLoading = true
  status = 'mint sbt'
  addSuccess('Mint SBT success')
  isLoading = false
}

const doUnlock = async () => {
  status = 'unlocking'
  isLoading = true
  const { doDecryptString } = litHelper({ chain: CHAIN_NAME })
  const { decryptedString } = await doDecryptString({ encryptedSymmetricKey: item.encryptedSymmetricKey, encryptedString: item.content, accessControlConditions: item.condition })

  item.content = decryptedString
  isLoading = false
  addSuccess('Unlock content success')
  console.log('====> unlock success :', decryptedString)
}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  max-w-2xl pt-16">
    <div class="flex-1 text-base  text-gray-700 leading-7">
      <Breadcrumbs />
      <h1 class="border-b font-bold border-gray-200 my-6 tracking-tight pb-4 text-3xl text-gray-900 sm:text-4xl ">
        {{ item.title }}
      </h1>
      <div>
        <p>{{ item.excerpt }}</p>
        <BsLoading v-if="isLoading" class="h-60" :is-loading="isLoading">
          <div>
            {{ status }}
          </div>
        </BsLoading>
        <div v-else my-10 items-center flex>
          <BsBtnBlack @click="doMintNFT">
            Mint NFT
          </BsBtnBlack>
          <BsBtnBlack @click="doMintSBT">
            Mint One Time Payment SBT NFT
          </BsBtnBlack>
          <BsBtnBlack @click="doUnlock">
            Unlock content
          </BsBtnBlack>
        </div>
        <v-md-preview :text="content" />
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
