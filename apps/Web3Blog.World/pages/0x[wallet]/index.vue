<script setup lang="ts">
const { walletAddress } = $(web3AuthStore())
const supabase = useSupabaseClient()

const { data: currentPageUser } = await supabase
  .from('web3Wallet')
  .select('user_id')
  .eq('address', walletAddress)
  .single()

const { data } = await supabase.from('profiles').select('*').eq('id', currentPageUser.user_id).single()

console.log('====> currentPageUser :', currentPageUser, data)

const newBookLink = $computed(() => `/${walletAddress}/new`)
const profile = {
  name: 'Bruce Wayne',
  imageUrl:
    '/img/bruce.jpg',
  coverImageUrl:
    '/img/mountain.jpg',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990',
  },
}
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '/1/',
    price: '48 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '/2/',
    price: '35 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '/3/',
    price: '89 $BST',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
]
</script>

<template>
  <div py-20>
    <div pb-10 border-b border-b-zinc-2 mb-10>
      <div rounded-lg overflow-hidden>
        <img class="object-cover h-32 w-full lg:h-48" :src="profile.coverImageUrl" alt="">
      </div>
      <div class=" mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-end">
          <div class="flex">
            <img class="rounded-full h-24 ring-white ring-4 w-24 sm:h-32 sm:w-32" :src="profile.imageUrl" alt="">
          </div>
          <div class="mt-6 sm:flex sm:space-x-6 sm:flex-1 sm:min-w-0 sm:pb-1 sm:items-baseline sm:justify-end">
            <div class="flex-1 mt-6 min-w-0 sm:hidden 2xl:block">
              <h1 class="font-bold text-2xl text-gray-900 truncate">
                {{ profile.name }}
              </h1>
            </div>
            <div class="flex space-x-2 py-3">
              <a href="#" block>
                <div i-ph-twitter-logo-light class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
              <a href="#" block>
                <div i-ri-github-fill class="h-6 text-gray-400 w-6 hover:text-black" />
              </a>
            </div>
          </div>
        </div>
        <div class="flex-1 mt-6 min-w-0 hidden sm:block 2xl:hidden">
          <h1 class="font-bold text-2xl text-gray-900 truncate">
            {{ profile.name }}
          </h1>
        </div>
      </div>
    </div>
    <div class="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2">
      <NuxtLink v-for="product in products" :key="product.id" :to="product.href" class="group">
        <div class="rounded-lg bg-gray-200 w-full overflow-hidden aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full object-cover object-center w-full group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">
          {{ product.name }}
        </h3>
        <p class="font-medium mt-1 text-lg text-gray-900">
          {{ product.price }}
        </p>
      </NuxtLink>
      <NuxtLink :to="newBookLink" class="group">
        <div class="border border-dashed rounded-lg flex border-gray-900/25 py-37 px-6 text-gray-500 justify-center">
          <div class="text-center">
            <div i-material-symbols-add class="mx-auto h-12  w-12" aria-hidden="true" />
            New Book
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
