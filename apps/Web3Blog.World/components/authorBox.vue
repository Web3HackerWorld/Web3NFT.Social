<script setup lang="ts">
const { address, chain, appaddress } = $defineProps<{
  address: String
  chain: String
  appaddress: String
}>()

let author = $ref({})
watchEffect(() => {
  if (!address || !chain || !appaddress)
    return

  const { data } = $(useWeb3SupabaseData('profile', $$({ address, chain, appaddress })))
  author = data
})
</script>

<template>
  <div class="flex mt-4 gap-x-4 relative items-center">
    <BsBoxImg :src="author.avatar" alt="" class="rounded-full bg-gray-50 h-10 w-10" />
    <div class="text-sm leading-6">
      <p class="font-semibold text-gray-900">
        <NuxtLink :to="`/${chain}/${address}`">
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
</template>
