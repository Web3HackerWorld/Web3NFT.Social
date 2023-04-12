<script setup lang="ts">
const { addSuccess } = $(notificationStore())
const user = $(useSupabaseUser())
const client = useSupabaseClient()

const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl:
    '/img/bruce.jpg',
}
const wait = async (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000 * sec)
  })
}
const route = useRoute()
const slug = $computed(() => route.params.cid)
const id = $computed(() => {
  return slug.split('-')[0]
})
const { data: post } = $(await useAsyncData(`web3Creation-${id}`, async () => {
  const { data } = await client.from('web3Creation').select().eq('id', id).single()
  return $$(data)
}))

let isLoading = $ref(false)
let status = $ref('')
const doMintNFT = async () => {
  isLoading = true
  status = 'mint nft'
  await wait(3)
  addSuccess('Mint NFT success')
  isLoading = false
}
const doMintSBT = async () => {
  isLoading = true
  status = 'mint sbt'
  await wait(3)
  addSuccess('Mint SBT success')
  isLoading = false
}

const doUnlock = async () => {
  status = 'unlocking'
  isLoading = true
  const { doDecryptString } = litHelper({ chain: CHAIN_NAME })
  const { decryptedString } = await doDecryptString({ encryptedSymmetricKey: post.encryptedSymmetricKey, encryptedString: post.content, accessControlConditions: post.condition })

  post.content = decryptedString
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
        {{ post.title }}
      </h1>
      <div>
        <p>{{ post.excerpt }}</p>
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
        <v-md-preview :text="post.content" />
      </div>
    </div>
    <div border-t border-gray-200 my-6 pt-6>
      <div class="flex gap-x-4 relative items-center">
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
    </div>
  </div>
</template>

<style>
.github-markdown-body{
  padding: 0
}
</style>
