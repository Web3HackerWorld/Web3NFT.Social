<script setup>
const route = useRoute()
const tokenId = $computed(() => route.params.tokenId)

const { walletAddress, chain, appAddress, contractRead } = $(web3AuthStore())
const { supabase } = $(supabaseStore())

const { data } = $(await useLazyAsyncData(async () => {
  const getTokenData = async () => {
    const { data } = await supabase.from('token').select()
      .eq('tokenid', tokenId)
      .eq('appaddress', appAddress)
      .eq('chain', chain)
      .single()
    return data
  }
  const token = await getTokenData()

  const getItemsData = async () => {
    const { data } = await supabase.from('item').select()
      .eq('tokenid', tokenId)
      .eq('address', token.address)
      .eq('appaddress', appAddress)
      .eq('chain', chain)

    return data
  }

  const getProfile = async () => {
    const { data } = await supabase.from('profile').select()
      .eq('address', token.address)
      .eq('appaddress', appAddress)
      .eq('chain', chain)
      .single()

    return data.metadata
  }
  const [author, items] = await Promise.all([getProfile(), getItemsData()])

  return $$({ token, items, author })
}, { watch: [$$(tokenId)] }))

const token = $computed(() => data?.token)
const items = $computed(() => data?.items)
const author = $computed(() => data?.author || {})

let totalSupply = $ref(0)
watchEffect(async () => {
  totalSupply = await contractRead('BuidlerProtocol', 'totalSupply', tokenId)
})

const maxSupply = $computed(() => useGet(token, 'metadata.properties.maxSupply'))
const categoryLink = post => `/category/${useGet(post, 'metadata.category')}`
const postLink = post => `${post.id}-${useKebabCase(post.title)}`
const authorLink = post => `/${chain}/${post.address}`
const writeLink = $computed(() => `/${chain}/${tokenId}/new`)
const canWrite = $computed(() => {
  if (!tokenId)
    return false
  if (!token || token.address !== walletAddress)
    return false

  return true
})
</script>

<template>
  <div class="py-12 sm:py-16">
    <div sm:flex justify="around">
      <div class="rounded-lg bg-gray-200  overflow-hidden aspect-h-1  aspect-w-1 sm:(w-1/2) xl:aspect-h-8 xl:aspect-w-7 ">
        <BsBoxImg :src="useGet(token, 'metadata.image')" class="h-full object-cover object-center w-full group-hover:opacity-75" />
      </div>
      <div flex flex-col mt-10 justify-center items-end class="sm:(pl-10 w-1/2) ">
        <div flex-1 flex flex-col items-center justify="center">
          <h2 class="font-bold tracking-tight pb-5 text-3xl text-gray-900 sm:text-4xl">
            {{ useGet(token, 'metadata.name') }}
          </h2>
          <p class="mt-2 text-lg text-gray-600 leading-8">
            {{ useGet(token, 'metadata.description') }}
          </p>
        </div>
        <div flex justify="end" items-center>
          <span mr-6>{{ totalSupply }} / {{ maxSupply }}</span>
          <BsBtnBlack>Seed Support</BsBtnBlack>
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
        <article v-for="post in items" :key="post.id" class="flex flex-col items-start justify-between">
          <div class="flex text-xs gap-x-4 items-center">
            <time :datetime="post.created_at" class="text-gray-500"> <BsTimeAgo :time="post.created_at" /></time>
            <NuxtLink :to="categoryLink(post)" class="rounded-full font-medium bg-gray-50 py-1.5 px-3 text-gray-600 z-10 relative hover:bg-gray-100">
              {{ useGet(post, 'metadata.category') }}
            </NuxtLink>
          </div>
          <div class="group relative">
            <h3 class="font-semibold text-lg text-gray-900 leading-6 group-hover:text-gray-600">
              <NuxtLink :to="postLink(post)">
                <span class="inset-0 absolute" />
                {{ useGet(post, 'metadata.title') }}
              </NuxtLink>
            </h3>
            <p class="mt-5 text-sm text-gray-600 leading-6 line-clamp-3">
              {{ useGet(post, 'metadata.excerpt') }}
            </p>
          </div>
          <div class="flex mt-4 gap-x-4 relative items-center">
            <BsBoxImg :src="author.avatar" alt="" class="rounded-full bg-gray-50 h-10 w-10" />
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <NuxtLink :to="authorLink(post)">
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
        </article>
      </div>
    </div>
  </div>
</template>
