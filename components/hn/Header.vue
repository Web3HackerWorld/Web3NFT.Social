<script setup lang="ts">
import { topicMap } from '~/share/hn'
</script>

<template>
  <header bg-zinc-900 z-999 absolute top-0 left-0 w-full sticky>
    <nav max-w-4xl mx-auto flex items-center h-14 px-3 py-2 lg:(px-2 py-4) sm:(p-4) role="navigation">
      <NuxtLink to="/" text-white mr-9>
        <img w-10 h-10 mr-3 rounded-xl inline-block src="/android-chrome-512x512.png" alt="logo">
      </NuxtLink>
      <NuxtLink v-for="(item, key) in topicMap" :key="key" class="nav-link" :to="`/${key}/1`" :class="$route.path.startsWith(`/${key}`) ? 'text-green-400' : 'text-white'">
        {{ item.title }}
      </NuxtLink>
      <BsLangSwitcher />
    </nav>
  </header>
</template>

<style scoped>
.nav-link{
  --at-apply: hover:(text-emerald)
  --at-apply: active:(text-emerald)
  --at-apply: leading-6 inline-block mr-6 font-300
  --at-apply: transition-colors ease-in-out duration-250
}
</style>
