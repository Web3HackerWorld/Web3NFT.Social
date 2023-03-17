<script setup lang="ts">
import { appName } from '~/constants'

useSeoMeta({
  titleTemplate: 'Web3 HN | %s',
  description: 'HackerNews clone by Web3Hacker.World.',
  ogImage: 'https://hn.web3hacker.world/cover.jpg',
  ogImageAlt: 'Web3 Hackernews',
  twitterImage: 'https://hn.web3hacker.world/cover.jpg',
  twitterSite: '@Web3HackerWorld',
  twitterCreator: '@Web3HackerWorld',
  twitterCard: 'summary_large_image',
})
useHead({
  title: appName,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
  ],
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
