<script setup lang="ts">
const route = useRoute()
const id = $computed(() => route.params.id)

const { data: user, pending } = $(await useFetch(() => `/api/user/${id}`))
</script>

<template>
  <div p-5>
    <BsLoading :is-loading="pending">
      <h1 text-2xl font-bold mb-4>
        User: {{ user.id }}
      </h1>
      <ul mb-4>
        <li>
          <span min-w-100>Created:</span> <BsTimeAgo :time="user.createdAt * 1000" />
        </li>
        <li>
          <span min-w-20>Karma:</span> {{ user.karma || '-' }}
        </li>
        <li
          v-if="user.about"
          py-4
          v-html="user.about"
        />
      </ul>
      <p class="links">
        <a underline :href="`https://news.ycombinator.com/submitted?id=${user.id}`" target="_blank">submissions</a> |
        <a underline :href="`https://news.ycombinator.com/threads?id=${user.id}`" target="_blank">comments</a>
      </p>
    </BsLoading>
  </div>
</template>
