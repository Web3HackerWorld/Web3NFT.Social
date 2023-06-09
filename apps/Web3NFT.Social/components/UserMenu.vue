<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const { walletAddress, chain } = $(web3AuthStore())
const { doSignOut, metadata } = $(supabaseStore())

const userNavigation = $computed(() => {
  return [
    { name: 'Your Profile', href: `/${chain}/${walletAddress}` },
    { name: 'Settings', href: `/${chain}/${walletAddress}/settings` },
    { name: 'Sign out', onClick: doSignOut },
  ]
})
</script>

<template>
  <Menu as="div" class="flex-shrink-0 relative">
    <div>
      <MenuButton class="bg-white rounded-full flex items-center  focus:outline-none">
        <span class="sr-only">Open user menu</span>
        <BsBoxImg v-if="metadata.avatar" class="rounded-full h-8 w-8" :src="metadata.avatar" alt="" />
        <div v-else i-heroicons-outline-user-circle class="rounded-full h-8 w-8" />
        <i i-heroicons-outline-chevron-down ml-2 text-zinc-4 w-4 h-4 />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="bg-white rounded-md shadow-lg ring-black mt-2 py-1 origin-top-right right-0 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
        <MenuItem>
          <NuxtLink :to="`/${chain}/${walletAddress}`" text-zinc-4 flex items-center lg:hidden text-sm py-2 px-4 text-gray-700 block hover:cursor-pointer>
            {{ shortAddress(walletAddress) }}
          </NuxtLink>
        </MenuItem>
        <MenuItem>
          <NuxtLink :to="`/${chain}/${walletAddress}/new`" text-zinc-4 flex items-center lg:hidden text-sm py-2 px-4 text-gray-700 block hover:cursor-pointer>
            <div i-heroicons-outline-pencil-square w-7 h-7 mr-1 />
            Create
          </NuxtLink>
        </MenuItem>
        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
          <button v-if="item.onClick" class="text-sm text-left w-full py-2 px-4 text-gray-700 block hover:(cursor-pointer bg-gray-100) " @click="item.onClick">
            {{ item.name }}
          </button>
          <NuxtLink v-else :to="item.href" class="text-sm py-2 px-4 text-gray-700 block hover:cursor-pointer" :class="[active ? 'bg-gray-100' : '']">
            {{ item.name }}
          </NuxtLink>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
