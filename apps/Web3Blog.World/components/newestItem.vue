<script setup lang="ts">
const route = useRoute()
const { chain: defaultChain } = $(web3AuthStore())
const chain = $computed(() => route.params.chain || defaultChain)

const { data: items } = $(useWeb3SupabaseData('item', $$({ chain }), false))
</script>

<template>
  <div class="border-t space-y-16 border-gray-200 mt-10 pt-10 sm:mt-16 sm:pt-16">
    <Item v-for="item in items" :key="item.id" :item="item" :chain="chain" />
  </div>
</template>
