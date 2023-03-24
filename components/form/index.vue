<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'

interface Props {
  cancelText?: string
  submitText?: string
  doCancel?: Function
  doSubmit?: Function
  status?: string
  isSuccess?: boolean
}
const props = defineProps<Props>()
let isLoading = $ref(false)

const doSubmit = async () => {
  if (isLoading)
    return
  isLoading = true
  await props.doSubmit()
  isLoading = false
}
</script>

<template>
  <div class="divide-y space-y-8 divide-gray-200">
    <template v-if="props.isSuccess">
      <div class="p-10">
        <div class="rounded-full flex mx-auto bg-green-100 h-12 w-12 items-center justify-center">
          <CheckIcon class="h-6 text-green-600 w-6" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="font-semibold text-base text-gray-900 leading-6">
            Successful
          </h3>
          <div class="mt-2">
            <slot name="success" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="divide-y space-y-8 divide-gray-200  sm:space-y-5">
        <BsLoading v-if="isLoading" class="h-60" :text="props.status" />
        <slot v-else />
      </div>
      <div class="pt-5">
        <div class="flex gap-x-3 justify-end">
          <slot v-if="$slots.bottom" name="bottom" />
          <template v-else>
            <BsBtnPlain v-if="props.doCancel && !isLoading" @click="props.doCancel">
              {{ props.cancelText ? props.cancelText : 'Cancel' }}
            </BsBtnPlain>
            <BsBtnBlack v-if="props.doSubmit" :is-loading="isLoading" @click="doSubmit">
              {{ props.submitText ? props.submitText : 'Submit' }}
            </BsBtnBlack>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
