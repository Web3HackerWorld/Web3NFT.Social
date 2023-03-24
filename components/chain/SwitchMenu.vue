<script setup lang="ts">
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const chainList = [
  { name: 'Mumbai', online: true },
  { name: 'Goerli', online: false },
]

const selected = $ref(chainList[0])
</script>

<template>
  <Listbox v-model="selected" as="div">
    <div class="relative">
      <ListboxButton class="bg-white border rounded-md cursor-default border-gray-300 shadow-sm text-left w-full py-2 pr-10 pl-3 relative sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span class="flex pr-2 inset-y-0 right-0 pointer-events-none absolute items-center">
          <ChevronUpDownIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="bg-white rounded-md shadow-lg ring-black mt-1 text-base w-full max-h-60 py-1 ring-1 ring-opacity-5 z-10 absolute overflow-auto sm:text-sm focus:outline-none">
          <ListboxOption v-for="item in chainList" :key="item.name" v-slot="{ active, selected }" as="template" :value="item">
            <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <div class="flex items-center">
                <span :class="[item.online ? 'bg-green-400' : 'bg-gray-200', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" aria-hidden="true" />
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ item.name }}
                  <span class="sr-only"> is {{ item.online ? 'online' : 'offline' }}</span>
                </span>
              </div>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
