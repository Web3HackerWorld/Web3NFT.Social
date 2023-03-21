<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'

const faqs = [
  {
    question: 'What\'s the best thing about Switzerland?',
    answer:
      'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'What\'s the best thing about Switzerland?',
    answer:
      'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  // More questions...
]
</script>

<template>
  <div class="bg-white border-t border-t-zinc-2  py-20 px-10 flow-root sm:py-26">
    <h2 class="text-center mb-20 text-2xl text-gray-900 leading-8">
      进度日志
    </h2>
    <dl class="divide-y space-y-6 divide-gray-900/10">
      <Disclosure v-for="faq in faqs" :key="faq.question" v-slot="{ open }" as="div" class="pt-6">
        <dt>
          <DisclosureButton class="flex text-left w-full text-gray-900 items-start justify-between">
            <span class="font-semibold text-base leading-7">{{ faq.question }}</span>
            <span class="flex h-7 ml-6 items-center">
              <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
              <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
            </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" class="mt-2 pr-12">
          <p class="text-base text-gray-600 leading-7">
            {{ faq.answer }}
          </p>
        </DisclosurePanel>
      </Disclosure>
    </dl>
  </div>
</template>
