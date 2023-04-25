<script setup lang="ts">
const { alertError } = $(notificationStore())
const { appaddress, walletAddress } = $(web3AuthStore())
const route = useRoute()
const router = useRouter()
const address = $computed(() => formatAddress(`0x${route.params.wallet}`))
const chain = $computed(() => route.params.chain)

const { data: author, hasLoaded: isAuthorLoaded } = $(useWeb3SupabaseData('profile', $$({ address, chain, appaddress })))

const profileName = $computed(() => {
  if (author.firstname && author.lastname)
    return `${author.firstname} ${author.lastname}`

  return shortAddress(address)
})

const tokentype = $ref('Web3Blog')
const { data: tokens, hasLoaded, isPending } = $(useWeb3SupabaseData('token', $$({ address, chain, tokentype }), false))

const noData = $computed(() => hasLoaded && tokens.length === 0)
const tokenLink = item => `/${chain}/${item.tokenid}`

watchEffect(() => {
  if (!isAuthorLoaded)
    return

  if (author.avatar)
    return

  if (!isSameAddress(address, walletAddress))
    return

  alertError('Please update your profile first to create your new Creation', () => {
    router.push(`/${chain}/${walletAddress}/settings`)
  })
})
</script>

<template>
  <div py-20>
    <div pb-10 border-b border-b-zinc-2 mb-10>
      <div rounded-lg overflow-hidden>
        <BsBoxImg class="object-cover h-32 w-full lg:h-48" :src="author.cover || '/img/mountain.jpg'" alt="" />
      </div>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-end">
          <div class="flex">
            <BsBoxImg class="rounded-full h-24 ring-white ring-4 w-24 sm:h-32 sm:w-32" :src="author.avatar || '/logo.png'" alt="" />
          </div>
          <div class="mt-6 sm:flex sm:space-x-6 sm:flex-1 sm:min-w-0 sm:pb-1 sm:items-baseline sm:justify-end">
            <div class="flex-1 mt-6 min-w-0 sm:hidden 2xl:block">
              <h1 class="font-bold text-2xl text-gray-900 truncate">
                {{ profileName }}
              </h1>
            </div>
            <div class="flex space-x-2 py-3">
              <a v-if="author.twitter" :href="author.twitter" block target="_blank">
                <div i-ph-twitter-logo-light class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
              <a v-if="author.github" :href="author.github" block target="_blank">
                <div i-ri-github-fill class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BsLoading :is-loading="isPending">
      <div v-if="isSameAddress(address, walletAddress) || !noData" class="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2">
        <NuxtLink v-for="item in tokens" :key="item.id" :to="tokenLink(item)" class="group">
          <div class="rounded-lg bg-gray-200 w-full overflow-hidden aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
            <BsBoxImg :src="useGet(item, 'metadata.image')" :alt="useGet(item, 'metadata.name')" class="h-full object-cover object-center h-40 w-full group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ useGet(item, 'metadata.name') }}
          </h3>
          <p class="font-medium mt-1 text-lg text-gray-900">
            {{ useGet(item, 'metadata.properties.basicPrice') }} $BST
          </p>
        </NuxtLink>
        <NuxtLink v-if="isSameAddress(address, walletAddress)" :to="`/${chain}/${address}/new`" class="group">
          <div class="border border-dashed rounded-lg flex border-gray-900/25 py-37 px-6 text-gray-500 justify-center">
            <div class="text-center">
              <div i-material-symbols-add class="mx-auto h-12  w-12" aria-hidden="true" />
              New Creation
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else>
        <div class="border-dashed rounded-lg border-2 border-gray-300 text-center w-full p-12 relative block">
          <div i-material-symbols-book class="mx-auto h-12 text-gray-400 w-12" />
          <span class="mt-5 text-sm text-gray-900 block">This user has no books yet</span>
        </div>
      </div>
    </BsLoading>
  </div>
</template>
