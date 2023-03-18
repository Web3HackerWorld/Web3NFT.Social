<script setup lang="ts">
const props = defineProps<{
  items: any
  isChild: boolean
}>()

const hasChildren = item => item?.comments.length > 0
const maxIndex = $computed(() => props.items.length - 1)
</script>

<template>
  <div class="border-1 border-zinc-200 my-2 py-3 px-2 sm:px-3">
    <ul role="list">
      <li v-for="(item, index) in items" :key="item.id">
        <div class="flex" :class="{ 'pb-3': isChild, 'border-b border-b-zinc-200 mb-2': maxIndex !== index && !hasChildren(item) }">
          <div v-if="!isChild && false" class="flex-shrink-0">
            <img class="rounded-md h-10 w-10" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div>
            <div class="text-sm">
              <NuxtLink :to="`/user/${item.by}`" hover:text-green-5 mr-2 underline>
                {{ item.by }}
              </NuxtLink>
              <span class="font-medium text-gray-500">
                <BsTimeAgo :time="item.time * 1000" />
              </span>
            </div>
            <div class="mt-1 text-sm text-gray-700">
              <div v-html="item.content" />
            </div>
          </div>
        </div>
        <div v-if="hasChildren(item)">
          <BsListChildren :items="item.comments" :is-child="true" />
        </div>
      </li>
    </ul>
  </div>
</template>
