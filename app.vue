<script setup lang="ts">
import { appName } from '~/constants'
const { initWeb3, removeWeb3EventListener } = $(web3AuthStore())
onMounted(initWeb3)
onUnmounted(removeWeb3EventListener)

// TODO: move config into .env
// useSeoMeta({
//   titleTemplate: 'Web3 HN | %s',
//   description: 'HackerNews clone by Web3Hacker.World.',
//   ogImage: 'https://hn.web3hacker.world/cover.jpg',
//   ogImageAlt: 'Web3 Hackernews',
//   twitterImage: 'https://hn.web3hacker.world/cover.jpg',
//   twitterSite: '@Web3HackerWorld',
//   twitterCreator: '@Web3HackerWorld',
//   twitterCard: 'summary_large_image',
// })
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

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: #F4F4F5;
  margin: 0;
  padding: 0;
  color: #18181B;
  overflow-y: scroll;
}
</style>
