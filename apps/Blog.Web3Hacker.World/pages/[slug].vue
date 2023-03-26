<script setup>
const user = $(useSupabaseUser())
const client = useSupabaseClient()

const author = {
  name: 'Bruce',
  role: 'Founder / Web3Hacker',
  href: '/user/bruce',
  imageUrl:
    '/img/bruce.jpg',
}

const route = useRoute()
const slug = $computed(() => route.params.slug)
const id = $computed(() => {
  return slug.split('-')[0]
})
const { data: post } = $(await useAsyncData(`web3Creation-${id}`, async () => {
  const { data } = await client.from('web3Creation').select().eq('id', id).single()
  return $$(data)
}))
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  max-w-2xl pt-16">
    <div class="flex-1 text-base  text-gray-700 leading-7">
      <Breadcrumbs />
      <h1 class="border-b font-bold border-gray-200 my-6 tracking-tight pb-4 text-3xl text-gray-900 sm:text-4xl ">
        {{ post.title }}
      </h1>
      <div>
        <v-md-preview :text="post.content" />
      </div>
    </div>
    <div border-t border-gray-200 my-6 pt-6>
      <div class="flex gap-x-4 relative items-center">
        <img :src="author.imageUrl" alt="" class="rounded-full bg-gray-50 h-10 w-10">
        <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <a :href="author.href">
              <span class="inset-0 absolute" />
              {{ author.name }}
            </a>
          </p>
          <p class="text-gray-600">
            {{ author.role }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.github-markdown-body{
  padding: 0
}
</style>
