<script setup lang="ts">
const props = defineProps<{
  urlPrefix: string
  page: number
  maxPage: number
}>()

const hasMore = $computed(() => props.page < props.maxPage)
</script>

<template>
  <div px-7 py-4 text-center>
    <NuxtLink
      v-if="page > 1"
      :to="`${urlPrefix}/${page - 1}`"
    >
      &lt; prev
    </NuxtLink>
    <span
      v-else
      op-50 mx-4
    >&lt; prev</span>
    <span w-25 text-center inline-block>{{ page }} / {{ maxPage }}</span>
    <NuxtLink
      v-if="hasMore"
      :to="`${urlPrefix}/${page + 1}`"
    >
      more &gt;
    </NuxtLink>
    <span
      v-else
      op-50 mx-4
    >more &gt;</span>
  </div>
</template>
