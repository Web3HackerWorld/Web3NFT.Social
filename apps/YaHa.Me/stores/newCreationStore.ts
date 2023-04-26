export const newCreationStore = defineStore('newCreationStore', () => {
  const items = $ref([
    {
      id: 334,
      score: 100,
    },
    {
      id: 223,
      score: 20,
    },
  ])

  return $$({ topicMap, items })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(newCreationStore, import.meta.hot))
