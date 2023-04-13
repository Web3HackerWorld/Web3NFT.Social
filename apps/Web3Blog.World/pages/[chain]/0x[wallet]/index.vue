<script setup lang="ts">
const { walletAddress } = $(web3AuthStore())
const { supabase } = $(supabaseStore())
const route = useRoute()
const address = $computed(() => `0x${route.params.wallet}`)
const chain = $computed(() => route.params.chain)

const { data } = await supabase.from('profile').select()
  .eq('address', address)
  .eq('chain', chain)
  .single()

const metadata = $computed(() => {
  const defaultVal = {
    avatar: '/logo.png',
    cover: '/img/mountain.jpg',
  }
  if (!data || !data.metadata)
    return defaultVal

  return {
    ...defaultVal,
    ...data.metadata,
  }
})

const profileName = $computed(() => {
  if (metadata.firstname && metadata.lastname)
    return `${metadata.firstname} ${metadata.lastname}`

  return shortAddress(data.address)
})

const items = [
  {
    id: 1,
    name: 'Earthen Bottle',
    price: '48 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    price: '35 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    price: '89 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
]

const { data: creationData } = await supabase.from('token').select()
  .eq('address', address)
  .eq('chain', chain)
  .eq('tokenType', 'Web3Blog')
  .single()

const tokenLink = item => `/${chain}/${item.tokenId}`
</script>

<template>
  <div py-20>
    <div pb-10 border-b border-b-zinc-2 mb-10>
      <div rounded-lg overflow-hidden>
        <BsBoxImg class="object-cover h-32 w-full lg:h-48" :src="metadata.cover" alt="" />
      </div>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-end">
          <div class="flex">
            <BsBoxImg class="rounded-full h-24 ring-white ring-4 w-24 sm:h-32 sm:w-32" :src="metadata.avatar" alt="" />
          </div>
          <div class="mt-6 sm:flex sm:space-x-6 sm:flex-1 sm:min-w-0 sm:pb-1 sm:items-baseline sm:justify-end">
            <div class="flex-1 mt-6 min-w-0 sm:hidden 2xl:block">
              <h1 class="font-bold text-2xl text-gray-900 truncate">
                {{ profileName }}
              </h1>
            </div>
            <div class="flex space-x-2 py-3">
              <a v-if="metadata.twitter" :href="metadata.twitter" block target="_blank">
                <div i-ph-twitter-logo-light class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
              <a v-if="metadata.github" :href="metadata.github" block target="_blank">
                <div i-ri-github-fill class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2">
      <NuxtLink v-for="item in items" :key="item.id" :to="tokenLink(item)" class="group">
        <div class="rounded-lg bg-gray-200 w-full overflow-hidden aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
          <img :src="item.imageSrc" :alt="item.imageAlt" class="h-full object-cover object-center w-full group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">
          {{ item.name }}
        </h3>
        <p class="font-medium mt-1 text-lg text-gray-900">
          {{ item.price }}
        </p>
      </NuxtLink>
      <NuxtLink :to="`/${chain}/${address}/new`" class="group">
        <div class="border border-dashed rounded-lg flex border-gray-900/25 py-37 px-6 text-gray-500 justify-center">
          <div class="text-center">
            <div i-material-symbols-add class="mx-auto h-12  w-12" aria-hidden="true" />
            New Book
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
