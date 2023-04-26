<script setup lang="ts">
const route = useRoute()
const { chain: defaultChain } = $(web3AuthStore())
const chain = $computed(() => route.params.chain || defaultChain)

const { data: items } = $(useWeb3SupabaseData('item', $$({ chain }), false))
</script>

<template>
  <div>
    <h2 text-3xl font-bold>
      Newest Creation
    </h2>
    <div class="border-t space-y-10 border-gray-200 mt-5 pt-5 sm:mt-8 sm:pt-8">
      <Item v-for="item in items" :key="item.id" :item="item" :chain="chain" />
    </div>
  </div>
</template>
