<script setup lang="ts">
const { error, success, alertType, doCloseAlert } = $(notificationStore())
</script>

<template>
  <BsDialogDefault :show="alertType !== false" @close="doCloseAlert">
    <div pt-2>
      <BsAlertError v-if="alertType === 'error'">
        {{ error }}
      </BsAlertError>
      <BsAlertSuccess v-if="alertType === 'success'">
        {{ success }}
      </BsAlertSuccess>
      <BsBtnBlack w-full mt-6 @click="doCloseAlert">
        OK
      </BsBtnBlack>
    </div>
  </BsDialogDefault>
</template>
