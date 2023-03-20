<script setup lang="ts">
const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    iconBackground: 'bg-green-500',
  },
]
</script>

<template>
  <div class="border-t border-t-zinc-2 py-20 px-10 flow-root sm:py-26">
    <h2 class="text-center mb-20 text-2xl text-gray-900 leading-8">
      路线图
    </h2>
    <ul role="list">
      <li v-for="(event, eventIdx) in timeline" :key="event.id">
        <div class="pb-8 relative">
          <span v-if="eventIdx !== timeline.length - 1" class="h-full -ml-px bg-gray-200 top-4 left-4 w-0.5 absolute" aria-hidden="true" />
          <div class="flex space-x-3 relative">
            <div>
              <span class="rounded-full flex h-8 ring-white ring-8 w-8 items-center justify-center" :class="[event.iconBackground]">
                <!-- <component :is="event.icon" class="h-5 text-white w-5" aria-hidden="true" /> -->
              </span>
            </div>
            <div class="flex space-x-4 flex-1 min-w-0 pt-1.5 justify-between">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }} <a :href="event.href" class="font-medium text-gray-900">{{ event.target }}</a>
                </p>
              </div>
              <div class="text-right text-sm text-gray-500 whitespace-nowrap">
                <time :datetime="event.datetime">{{ event.date }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
