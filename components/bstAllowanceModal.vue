<script setup lang="ts">
const { allowanceModal } = $(appStore())
const { getContractAddress, initContract, walletAddress, addSuccess, addLoading } = $(web3AuthStore())
let tokenAddress = $ref('')
let appaddress = $ref('')
let approveAmount = $ref('')
let currentAllowance = $ref(0)
let isLoading = $ref(false)

let error = $ref('')
watchEffect(async () => {
  if (!allowanceModal.tokenContractName || !allowanceModal.appContractName)
    return

  approveAmount = formatEther(allowanceModal.amount)
  tokenAddress = getContractAddress(allowanceModal.tokenContractName)
  const contract = await initContract(allowanceModal.tokenContractName)

  appaddress = getContractAddress(allowanceModal.appContractName)

  currentAllowance = await contract.allowance(walletAddress, appaddress)
})

const doApprove = async () => {
  if (isLoading)
    return
  isLoading = true
  const contract = await initContract(allowanceModal.tokenContractName, true)
  try {
    const loadingItem = addLoading('Approving new allowance, wait for your confirm in metamask')
    const tx = await contract.approve(appaddress, parseEther(approveAmount))
    addSuccess('Approve new allowance successed!', loadingItem)
    const loadingItem2 = addLoading('Waiting for the blockchain to excute the action')
    await tx.wait()
    addSuccess('Block mint successed!', loadingItem2)
    currentAllowance = await contract.allowance(walletAddress, appaddress)
    await allowanceModal.doClose()

    allowanceModal.tokenContractName = ''
    allowanceModal.appContractName = ''
    allowanceModal.amount = '0'
    allowanceModal.doClose = () => { }
    error = ''
  }
  catch (err) {
    error = err
  }
  isLoading = false
}
</script>

<template>
  <BsDialogWide :show="allowanceModal.isShow" @close="allowanceModal.doClose">
    <div class="w-sm py-6">
      <div class="text-center ">
        <h3 class="font-medium text-xl text-gray-900 leading-6">
          Add allowance
        </h3>
        <div class="mt-2">
          <p class="text-sm py-4 text-gray-500">
            Here you can add more
            <span font-medium>
              {{ allowanceModal.tokenContractName }} {{ shortAddress(tokenAddress) }}
            </span>
            allowance for <br> Application
            <span font-medium>
              {{ allowanceModal.appContractName }} {{ shortAddress(appaddress) }}
            </span>
          </p>
          <h3 class="text-lg text-left pt-4">
            Current allowance: <span font-medium>{{ formatEther(currentAllowance) }}</span>
          </h3>
          <h3 class=" text-lg text-left pt-2">
            Required minimum allowance: <span font-medium>{{ formatEther(allowanceModal.amount) }}</span>
          </h3>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-6">
        <label for="amount" text-lg font-medium>New approve amount</label>
        <input id="approveAmount" v-model="approveAmount" type="text" name="approveAmount" autocomplete="approveAmount" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700" placeholder="Please input new approve amount">
      </div>
      <BsAlertError v-if="error" mb-4>
        {{ error.message }}
      </BsAlertError>

      <BsBtnIndigo class="w-full" :is-loading="isLoading" @click="doApprove">
        Approve
      </BsBtnIndigo>
    </div>
  </BsDialogWide>
</template>
