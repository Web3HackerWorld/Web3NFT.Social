<script setup lang="ts">
const { error, success, alertType, doCloseAlert } = $(notificationStore())
</script>

<template>
  <BsDialogDefault :show="alertType !== false" @close="doCloseAlert">
    <div min-w-sm>
      <BsAlertError v-if="alertType === 'error'" :title="error.title">
        {{ error }}
      </BsAlertError>
      <BsAlertSuccess v-if="alertType === 'success'" :title="success">
        {{ success }}
      </BsAlertSuccess>
    </div>
  </BsDialogDefault>
</template>
