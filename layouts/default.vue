<script setup lang="ts">
import { topicMap } from '~/share/hn'

const route = useRoute()
const noBg = $computed(() => route.meta.noBg)
</script>

<template>
  <div bg-zinc-100 text-zinc-900 relative>
    <header bg-zinc-900 z-999 absolute top-0 left-0 w-full>
      <nav max-w-2xl mx-auto flex items-center h-14 px-3 py-2 lg:(px-0 py-4) sm:(p-4) role="navigation">
        <NuxtLink to="/">
          <img w-10 h-10 mr-3 inline-block src="/vite.png" alt="logo">
        </NuxtLink>
        <NuxtLink v-for="(item, key) in topicMap" :key="key" class="nav-link" :to="`/${key}/1`" :class="$route.path.startsWith(`/${key}`) ? 'text-green-400' : 'text-white'">
          {{ item.title }}
        </NuxtLink>
        <BsLangSwitcher />
      </nav>
    </header>
    <div max-w-2xl mx-auto :class="noBg ? '' : 'bg-white'">
      <div pt-14>
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: #F4F4F5;
  margin: 0;
  padding: 0;
  color: #18181B;
  overflow-y: scroll;
}
.nav-link{
  --at-apply: hover:(text-emerald)
  --at-apply: active:(text-emerald)
  --at-apply: leading-6 inline-block mr-6 font-300
  --at-apply: transition-colors ease-in-out duration-250
}
</style>
