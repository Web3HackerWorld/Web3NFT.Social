<script setup lang="ts">
const tabs = [
  { name: 'General', href: '#', current: true },
  // { name: 'Password', href: '#', current: false },
  // { name: 'Notifications', href: '#', current: false },
  // { name: 'Plan', href: '#', current: false },
  // { name: 'Billing', href: '#', current: false },
  // { name: 'Team Members', href: '#', current: false },
]

const profile = $ref({
  twitter: '',
  github: '',
})
</script>

<template>
  <div class="flex flex-col mx-auto  max-w-5xl">
    <div class="pt-10 pb-16">
      <h1 class="font-bold tracking-tight text-3xl text-gray-900">
        Settings
      </h1>
      <div class="w-full py-6">
        <!-- Tabs -->
        <div class="lg:hidden">
          <label for="selected-tab" class="sr-only">Select a tab</label>
          <select id="selected-tab" name="selected-tab" class="rounded-md border-0 ring-inset mt-1 w-full py-1.5 pr-10 pl-3 ring-1 ring-gray-300 text-gray-900 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-500">
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden lg:block">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px space-x-8">
              <a v-for="tab in tabs" :key="tab.name" :href="tab.href" class="font-medium border-b-2 text-sm py-4 px-1 whitespace-nowrap" :class="[tab.current ? 'border-gray-700 text-gray-800' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">{{ tab.name }}</a>
            </nav>
          </div>
        </div>

        <form class="divide-y space-y-8 divide-y-slate-200 mt-6">
          <div class="grid gap-y-6 grid-cols-1 sm:gap-x-6 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <h2 class="font-medium text-xl text-slate-900">
                Profile
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label for="photo" class="font-medium text-sm text-slate-900 leading-6 block">Photo</label>
              <div class="flex mt-2 items-center">
                <img class="rounded-full h-12 w-12 inline-block" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" alt="">
                <div class="ml-4 relative">
                  <input id="user-photo" name="user-photo" type="file" class="rounded-md h-full w-full opacity-0 inset-0 peer absolute">
                  <label for="user-photo" class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm py-2 px-3 ring-1 ring-slate-300 text-slate-900 pointer-events-none block peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600">
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                  </label>
                </div>
                <button type="button" class="font-medium text-sm ml-6 text-slate-900 leading-6">
                  Remove
                </button>
              </div>
            </div>

            <div class="col-span-full">
              <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block">Cover photo</label>
              <div class="border border-dashed rounded-lg flex border-gray-900/25 mt-2 py-10 px-6 justify-center">
                <div class="text-center">
                  <div i-material-symbols-imagesmode class="mx-auto h-12 text-gray-300 w-12" aria-hidden="true" />
                  <div class="flex mt-4 text-sm text-gray-600 leading-6">
                    <label for="file-upload" class="bg-white rounded-md cursor-pointer font-semibold text-indigo-600 relative hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                    <p class="pl-1">
                      or drag and drop
                    </p>
                  </div>
                  <p class="text-xs text-gray-600 leading-5">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="first-name" class="font-medium text-sm text-slate-900 leading-6 block">First name</label>
              <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="font-medium text-sm text-slate-900 leading-6 block">Last name</label>
              <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="sm:col-span-6">
              <label for="description" class="font-medium text-sm text-slate-900 leading-6 block">BIO</label>
              <div class="mt-2">
                <textarea id="description" name="description" rows="4" class="rounded-md border-0 shadow-sm ring-inset w-full ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:py-1.5 sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500" />
              </div>
              <p class="mt-3 text-sm text-slate-500">
                Brief description for your profile. Simple markdown support.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label for="twitter" class="font-medium text-sm text-slate-900 leading-6 block">Twitter</label>
              <div class="rounded-md flex shadow-sm mt-2">
                <input id="twitter" type="text" name="twitter" placeholder="https://twitter.com/xxxx" autocomplete="twitter" $="profile.twitter" class="rounded-md border-0 flex-1 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="github" class="font-medium text-sm text-slate-900 leading-6 block">GitHub</label>
              <div class="rounded-md flex shadow-sm mt-2">
                <input id="github" type="text" name="github" placeholder="https://github.com/xxxx" autocomplete="github" $="profile.github" class="rounded-md border-0 flex-1 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <div class="flex pt-8 gap-x-3 justify-end">
            <button type="button" class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm py-2 px-3 ring-1 ring-slate-300 text-slate-900 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" class="rounded-md font-semibold bg-blue-600 shadow-sm text-sm text-white py-2 px-3 inline-flex justify-center hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
