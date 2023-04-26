<script setup>
const route = useRoute()
const tokenid = $computed(() => route.params.tokenid)

const { walletAddress, chain, appaddress } = $(web3AuthStore())
const { totalSupply, maxSupply, isLoading: isTokenLoading, doUpdate: updateToken } = $(useToken($$(tokenid)))

const { data: token } = $(useWeb3SupabaseData('token', $$({ chain, tokenid, appaddress })))
const { data: items } = $(useWeb3SupabaseData('item', $$({ chain, tokenid, appaddress }), false))

useSeoMeta({
  title: () => `${token.name}`,
  description: () => `${token.description}`,
})

const writeLink = $computed(() => `/${chain}/${tokenid}/new`)
const canWrite = $computed(() => {
  if (!tokenid)
    return false
  if (!token || token.address !== walletAddress)
    return false

  return true
})

const { showMintModal } = $(appStore())

const nftPassMintParams = $computed(() => {
  return {
    amount: '1',
    tokenid,
    chain,
    appaddress,
    doClose: async () => {
      await updateToken(true)
    },
  }
})
</script>

<template>
  <div class="py-12 sm:py-16">
    <div sm:flex justify="around">
      <div class="rounded-lg bg-gray-200  overflow-hidden aspect-h-1  aspect-w-1 sm:(w-1/2) xl:aspect-h-8 xl:aspect-w-7 ">
        <BsBoxImg :src="useGet(token, 'image')" class="h-full object-cover object-center min-h-80 w-full group-hover:opacity-75" />
      </div>
      <div flex flex-col mt-10 justify-center items-end class="sm:(pl-10 w-1/2) ">
        <div flex-1 flex flex-col items-center justify="center">
          <h2 class="font-bold tracking-tight pb-5 text-3xl text-gray-900 sm:text-4xl">
            {{ useGet(token, 'name') }}
          </h2>
          <p class="mt-2 text-lg text-gray-600 leading-8">
            {{ useGet(token, 'description') }}
          </p>
        </div>
        <div flex items-center w-full>
          <div flex-1 flex justify="between">
            <span>{{ totalSupply }} / {{ maxSupply }}</span>
            <span mr-3>
              {{ useGet(token, 'properties.basicPrice') }} $BST
            </span>
          </div>
          <BsBtnBlack @click="showMintModal(nftPassMintParams)">
            Mint
          </BsBtnBlack>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 mt-10 pt-10">
      <div flex justify="end" items-center mb-10>
        <NuxtLink v-if="canWrite" :to="writeLink" text-zinc-4 items-center flex hover:text-zinc-8>
          <div i-heroicons-outline-pencil-square w-7 h-7 />
          Write
        </NuxtLink>
      </div>
      <div space-y-16>
        <Item v-for="item in items" :key="item.id" :item="item" :chain="chain" />
      </div>
    </div>
  </div>
</template>
