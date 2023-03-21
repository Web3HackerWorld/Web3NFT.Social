<script setup lang="ts">
import { format } from 'timeago.js'
const props = defineProps<{
  time: any
}>()
const { locale } = $(useI18n())
const localeMap = {
  en: 'en_US',
  zh: 'zh_CN',
}
const theLocale = $computed(() => {
  return localeMap[locale] || 'en_US'
})
const timeStr = $computed(() => format(props.time, theLocale))
</script>

<template>
  <span>{{ timeStr }}</span>
</template>
