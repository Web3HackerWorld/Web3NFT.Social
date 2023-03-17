<script setup lang="ts">
import { topicMap } from '~/share/hn'

const route = useRoute()
const router = useRouter()
const page = $computed(() => +route.params.page || 1)
const topic = $computed(() => route.params.topic)

const maxPage = $computed(() => {
  return +(topicMap[topic]?.pages) || 0
})

const { data: items, pending } = $(await useFetch(() => `/api/items?topic=${topic}&page=${page}`))
</script>

<template>
  <div>
    <BsNav :url-prefix="`/${topic}`" :page="page" :max-page="maxPage" />
    <BsLoading :is-loading="pending">
      <BsListItem v-for="item in items" :key="item.id" :item="item" />
      <BsNav :url-prefix="`/${topic}`" :page="page" :max-page="maxPage" />
    </BsLoading>
  </div>
</template>
