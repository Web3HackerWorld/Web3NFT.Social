<script setup lang="ts">
interface Props {
  modelValue: string | Object
  balanceEnough: boolean
}
let {
  modelValue,
  balanceEnough
} = defineProps<Props>()
const emit = defineEmits(["update:modelValue", "update:balanceEnough"])

const {
  payTokenList,
  bstBalance,
  payBy,
} = $(appStore())

watchEffect(() => {
  if (bstBalance.lt(modelValue))
    emit('update:balanceEnough', false)
  else
    emit('update:balanceEnough', true)
})
</script>

<template>
  <div v-bind="$attrs">
    <div flex-bc>
      <div>
        Pay By
      </div>
      <div flex justify="end" items-center>
        <BsFormSelect id="payBy" v-model="payBy" :list="payTokenList" />
      </div>
    </div>
    <div flex-bc>
      <div>
        Your balance
      </div>
      <div>
        {{ formatUnits(bstBalance) }} {{ payBy }}
      </div>
    </div>
    <div flex-bc>
      <div>
        <slot />
      </div>
      <div flex justify="end" items-center>
        {{ formatUnits(modelValue) }} {{ payBy }}
      </div>
    </div>
  </div>
</template>
