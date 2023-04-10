<script setup lang="ts">
const { error, success, alertType } = $(notificationStore())
</script>

<template>
  <BsDialogDefault :show="alertType !== false" @close="alertType = false">
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
