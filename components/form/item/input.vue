<script setup lang="ts">
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
interface Props {
  for?: string
  label?: string
  ph?: string
  modelValue?: string
}
const model = $computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  },
})

const theLabel = $computed(() => props.label || useUpperFirst(props.for))
</script>

<template>
  <BsFormItem :for="props.for" :label="theLabel">
    <input :id="props.for" v-model="model" type="text" :name="props.for" :autocomplete="props.for" class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-600" :placeholder="props.ph">
  </BsFormItem>
</template>
