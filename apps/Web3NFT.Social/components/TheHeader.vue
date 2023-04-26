<script setup lang="ts">
const { initWeb3, walletAddress, isShowLoginModal } = $(web3AuthStore())
const { token } = $(supabaseStore())
</script>

<template>
  <div border-b border-b-zinc-2 px-6 lg:px-8 py-2 flex-cc>
    <div flex justify-between max-w-5xl w-full>
      <div flex items-center>
        <div>
          <NuxtLink to="/" flex-cc>
            <img src="/logo.png" w-20 h-10 object-cover rounded-md mr-2>
            <!-- <span text-3xl font-bold>Web3NFT.Social</span> -->
          </NuxtLink>
        </div>
        <div v-if="false" hidden lg:flex w-full sm:max-w-sm ml-4>
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center">
              <span i-heroicons-outline-magnifying-glass class="h-5 text-gray-400 w-5" aria-hidden="true" />
            </div>
            <input id="search" name="search" class="bg-white rounded-md border-0 ring-inset w-full py-1.5 pr-3 pl-10 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600" placeholder="Search" type="search">
          </div>
        </div>
      </div>
      <div flex items-center space-x-2 lg:space-x-8>
        <NuxtLink v-if="false" to="/search" i-heroicons-outline-magnifying-glass w-7 h-7 text-zinc-4 lg:hidden>
          Search
        </NuxtLink>
        <template v-if="token">
          <!-- <NuxtLink to="/notifications" i-mdi-bell-outline w-7 h-7 text-zinc-4 hidden>
          Notifications
        </NuxtLink> -->
          <UserMenu />
        </template>
        <template v-else>
          <BsBtnBlack v-if="!walletAddress" @click="() => initWeb3(true)">
            Login
          </BsBtnBlack>
          <BsBtnBlack v-else @click="isShowLoginModal = true">
            Login
          </BsBtnBlack>
        </template>
      </div>
    </div>
  </div>
</template>
