<script setup lang="ts">
definePageMeta({
  noBg: true,
})

const route = useRoute()
const id = $computed(() => route.params.id)

const { data: item, pending } = $(await useLazyFetch(() => `/api/item/${id}`))

useHead({
  title: item?.title,
})
</script>

<template>
  <div>
    <BsLoading :is-loading="pending">
      <div bg-white p-5 shadow-md>
        <template v-if="item?.url.startsWith('http')">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
          ><h1 text-2xl font-bold inline v-text="item.title" /></a>
          <span text-zinc-500> ({{ host(item.url) }})</span>
        </template>
        <template v-else>
          <h1 text-2xl font-bold inline v-text="item.title" />
        </template>
        <p text-zinc-500 mt-2>
          {{ item.score }} points | by
          <NuxtLink :to="`/user/${item.by}`" hover:text-green-5 mr-2 underline>
            {{ item.by }}
          </NuxtLink>
          <BsTimeAgo :time="item.time * 1000" />
        </p>
      </div>
      <div bg-white p-5 shadow-md mt-3>
        <h2 text-lg pb-3>
          {{ item?.comments?.length ? `${item.comments.length} comments` : `No comments yet` }}
        </h2>
        <BsListChildren :items="item.comments" :is-child="false" />
      </div>
    </BsLoading>
  </div>
</template>
