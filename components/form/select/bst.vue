<script setup lang="ts">
let { modelValue, balanceEnough } = $defineModels<{
  modelValue: string | Object
  balanceEnough: boolean
}>()

const {
  payTokenList,
  bstBalance,
  payBy,
} = $(appStore())

watchEffect(() => {
  if (bstBalance.lt(modelValue))
    balanceEnough = false
  else
    balanceEnough = true
})
</script>

<template>
  <div v-bind="$attrs">
    <div flex-bc>
      <div>
        Pay By
      </div>
      <div flex justify="end" items-center>
        <BsFormSelect id="payBy" $="payBy" :list="payTokenList" />
      </div>
    </div>
    <div flex-bc>
      <div>
        Your balance
      </div>
      <div>
        {{ formatEther(bstBalance) }} {{ payBy }}
      </div>
    </div>
    <div flex-bc>
      <div>
        <slot />
      </div>
      <div flex justify="end" items-center>
        {{ formatEther(modelValue) }} {{ payBy }}
      </div>
    </div>
  </div>
</template>
