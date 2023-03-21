<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const useCurrentTime = () => {
  const currentTime = ref(new Date())
  const updateCurrentTime = () => {
    currentTime.value = new Date()
  }
  const updateTimeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval)
  })
  return {
    currentTime,
  }
}

const { currentTime } = useCurrentTime()
</script>

<template>
  <div class="flex flex-col h-screen items-center">
    <div text-8xl font-bold flex items-center class="h-1/3">
      Web3Hacker.World
    </div>
    <div
      class="bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 border-4 border-t-purple-600 border-r-pink-600 border-b-pink-600 border-l-indigo-600 shadow-lg  p-7 shadow-pink-400 lg:w-1/2"
    >
      <p class="font-bold text-white pt-3 text-4xl lg:text-6xl xl:text-8xl">
        {{ currentTime.toLocaleTimeString() }}
      </p>
      <p class="flex font-bold text-white text-sm mr-3 mb-1 justify-end">
        {{ currentTime.toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>
