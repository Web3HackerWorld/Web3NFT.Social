<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string
}
const {
  modelValue,
} = defineProps<Props>()

</script>
<template>
  <div class="divide-y space-y-8 divide-gray-200">
    <div class="divide-y space-y-8 divide-gray-200 sm:space-y-5">
      <div class="space-y-6  sm:space-y-5">
        <div>
          <h3 class="font-semibold text-base text-gray-900 leading-6">
            Profile
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div class="space-y-6 sm:space-y-5">
          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="username" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Username</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <div class="rounded-md flex max-w-lg shadow-sm">
                <span class="border rounded-l-md border-r-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">workcation.com/</span>
                <input id="username" type="text" name="username" autocomplete="username" class="rounded-none rounded-r-md border-0 flex-1 ring-inset w-full min-w-0 py-1.5 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
              </div>
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="about" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">About</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <textarea id="about" name="about" rows="3" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:py-1.5 sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600" />
              <p class="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-center">
            <label for="photo" class="font-medium text-sm text-gray-900 leading-6 block">Photo</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <div class="flex items-center">
                <span class="rounded-full bg-gray-100 h-12 w-12 overflow-hidden">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button type="button" class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm ml-5 py-1.5 px-2.5 ring-1 ring-gray-300 text-gray-900 hover:bg-gray-50">
                  Change
                </button>
              </div>
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Cover photo</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <div class="border-dashed rounded-md flex max-w-lg border-2 border-gray-300 px-6 pt-5 pb-6 justify-center">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 text-gray-400 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="bg-white rounded-md cursor-pointer font-medium text-indigo-600 relative hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                    <p class="pl-1">
                      or drag and drop
                    </p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 class="font-semibold text-base text-gray-900 leading-6">
            Personal Information
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div class="space-y-6 sm:space-y-5">
          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="first-name" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">First name</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="last-name" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Last name</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="email" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Email address</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="email" name="email" type="email" autocomplete="email" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="country" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Country</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <select id="country" name="country" autocomplete="country-name" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="street-address" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Street address</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="street-address" type="text" name="street-address" autocomplete="street-address" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="city" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">City</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="city" type="text" name="city" autocomplete="address-level2" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="region" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">State / Province</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="region" type="text" name="region" autocomplete="address-level1" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>

          <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
            <label for="postal-code" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">ZIP / Postal code</label>
            <div class="mt-2 sm:mt-0 sm:col-span-2">
              <input id="postal-code" type="text" name="postal-code" autocomplete="postal-code" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-gray-300 text-gray-900 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600">
            </div>
          </div>
        </div>
      </div>

      <div class="divide-y space-y-6 divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 class="font-semibold text-base text-gray-900 leading-6">
            Notifications
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>
        </div>
        <div class="divide-y space-y-6 divide-gray-200 sm:space-y-5">
          <div class="pt-6 sm:pt-5">
            <div role="group" aria-labelledby="label-email">
              <div class="sm:grid sm:gap-4 sm:grid-cols-3">
                <div>
                  <div id="label-email" class="font-semibold text-sm text-gray-900 leading-6">
                    By Email
                  </div>
                </div>
                <div class="mt-4 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg space-y-4">
                    <div class="flex relative items-start">
                      <div class="flex h-6 items-center">
                        <input id="comments" name="comments" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                      </div>
                      <div class="text-sm ml-3 leading-6">
                        <label for="comments" class="font-medium text-gray-900">Comments</label>
                        <p class="text-gray-500">
                          Get notified when someones posts a comment on a posting.
                        </p>
                      </div>
                    </div>
                    <div class="flex relative items-start">
                      <div class="flex h-6 items-center">
                        <input id="candidates" name="candidates" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                      </div>
                      <div class="text-sm ml-3 leading-6">
                        <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                        <p class="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div class="flex relative items-start">
                      <div class="flex h-6 items-center">
                        <input id="offers" name="offers" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                      </div>
                      <div class="text-sm ml-3 leading-6">
                        <label for="offers" class="font-medium text-gray-900">Offers</label>
                        <p class="text-gray-500">
                          Get notified when a candidate accepts or rejects an offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-6 sm:pt-5">
            <div role="group" aria-labelledby="label-notifications">
              <div class="sm:grid sm:gap-4 sm:grid-cols-3 sm:items-baseline">
                <div>
                  <div id="label-notifications" class="font-semibold text-sm text-gray-900 leading-6">
                    Push Notifications
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="max-w-lg">
                    <p class="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div class="space-y-4 mt-4">
                      <div class="flex items-center">
                        <input id="push-everything" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                        <label for="push-everything" class="font-medium text-sm ml-3 text-gray-900 leading-6 block">Everything</label>
                      </div>
                      <div class="flex items-center">
                        <input id="push-email" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                        <label for="push-email" class="font-medium text-sm ml-3 text-gray-900 leading-6 block">Same as email</label>
                      </div>
                      <div class="flex items-center">
                        <input id="push-nothing" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-600">
                        <label for="push-nothing" class="font-medium text-sm ml-3 text-gray-900 leading-6 block">No push notifications</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex gap-x-3 justify-end">
        <button type="button" class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm py-2 px-3 ring-1 ring-gray-300 text-gray-900 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" class="rounded-md font-semibold bg-indigo-600 shadow-sm text-sm text-white py-2 px-3 inline-flex justify-center hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
