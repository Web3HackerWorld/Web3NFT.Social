<script setup lang="ts">
import { topicMap } from '~/share/hn'

const route = useRoute()
const page = $computed(() => +route.params.page || 1)
const topic = $computed(() => route.params.topic)

const maxPage = $computed(() => {
  return +(topicMap[topic]?.pages) || 0
})

const { data: items, pending } = $(await useLazyFetch(() => `/api/item/?topic=${topic}&page=${page}`))

useHead({
  title: topicMap[topic]?.title,
})
</script>

<template>
  <div>
    <BsNav :url-prefix="`/${topic}`" :page="page" :max-page="maxPage" />
    <BsLoading :is-loading="pending">
      <div border-t border-b-zinc-200>
        <BsListItem v-for="item in items" :key="item.id" :item="item" />
      </div>
      <BsNav :url-prefix="`/${topic}`" :page="page" :max-page="maxPage" />
    </BsLoading>
  </div>
</template>
