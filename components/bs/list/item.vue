<script setup lang="ts">
defineProps<{
  item: any
}>()

const isLink = (item) => {
  return item.url?.startsWith('http')
}
</script>

<template>
  <div flex-cy leading-5 py-5 border-b border-b-zinc-200>
    <div font-bold w-20 text-center>
      {{ item.score }}
    </div>
    <div flex-1 pr-4>
      <div>
        <template v-if="isLink(item)">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
          >{{ item.title }}</a>
          <span text-sm text-zinc-500> ({{ host(item.url) }})</span>
        </template>
        <NuxtLink v-else :to="`/item/${item.id}`">
          {{ item.title }}
        </NuxtLink>
      </div>
      <div>
        <div text-sm text-zinc-500>
          by  <NuxtLink :to="`/user/${item.by}`" mr-2 underline hover:text-green-500>
            {{ item.by }}
          </NuxtLink>
          <BsTimeAgo :time="item.time * 1000" />
          <span
            v-if="item.type !== 'job'"
          >
            |
            <NuxtLink :to="`/item/${item.id}`" underline hover:text-green-500>{{ item.commentsCount }} comments</NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
