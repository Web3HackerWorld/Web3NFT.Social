<script lang="ts" setup>
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
interface Props {
  modelValue: boolean
  title: string
}
let {
  modelValue,
  title
} = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

const value = $computed({
  get() { return modelValue },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <span class="flex flex-grow flex-col">
      <SwitchLabel as="span" class="font-medium text-sm text-gray-900 leading-6" passive>{{ title }}</SwitchLabel>
      <SwitchDescription as="span" class="text-sm text-gray-500"><slot /></SwitchDescription>
    </span>
    <Switch v-model="value" class="border-transparent rounded-full cursor-pointer border-2 flex-shrink-0 h-6 transition-colors ease-in-out w-11 duration-200 relative inline-flex focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2" :class="[value ? 'bg-zinc-600' : 'bg-gray-200']">
      <span aria-hidden="true" class="bg-white rounded-full h-5 shadow transform transition ease-in-out ring-0 w-5 duration-200 pointer-events-none inline-block" :class="[value ? 'translate-x-5' : 'translate-x-0']" />
    </Switch>
  </SwitchGroup>
</template>
