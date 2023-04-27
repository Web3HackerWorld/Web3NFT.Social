<script setup lang="ts">
const {
  payTokenAddress,
  payBy,
  currentAllowance,
  allowanceModal,
  distributor,
  tokenMintModal,
  queryAllowance,
  showAllowanceModal,
} = $(appStore())

let { chain, appaddress, tokenid, metaType, amount, isShow } = $(tokenMintModal)
const { walletAddress: address, storeJsonWithStatus, bpAction } = $(web3AuthStore())
const { insertDataWithStatus } = $(supabaseStore())

const { metadata, basicPrice, totalSupply, maxSupply, isLoading: isTokenLoading, doUpdate: updateToken } = $(useToken($$(tokenid)))

watchEffect(async () => {
  if (!isShow)
    return
  await updateToken(true)
})

const mintCost = $computed(() => {
  return basicPrice.mul(tokenMintModal.amount)
})

let isLoading = $ref(false)
const balanceEnough = $ref(false)

const canSubmit = $computed(() => {
  if (isLoading)
    return false
  if (tokenMintModal.amount <= 0)
    return false
  if (!balanceEnough)
    return false

  return true
})

const doClose = async () => {
  await tokenMintModal.doClose()
  isShow = false
  isLoading = false
}
const doSubmit = async () => {
  if (currentAllowance.lt(mintCost)) {
    showAllowanceModal({
      amount: mintCost,
      doClose: async () => {
        await queryAllowance()
        allowanceModal.isShow = false
        if (!currentAllowance.lt(mintCost))
          await doSubmit()
      },
    })
    return
  }

  isLoading = true

  const metadata = {
    amount,
    metaType,
    basicPrice,
    payTokenAddress,
    payBy,
    distributor,
  }
  const cid = await storeJsonWithStatus(metadata)
  let rc = ''
  if (metaType === 'OTP')
    rc = await bpAction('buyOTP', tokenid, amount, cid, payTokenAddress, distributor)
  else
    rc = await bpAction('addMeta', metaType, tokenid, amount, cid, payTokenAddress, distributor)
  await insertDataWithStatus('meta', { metadata, chain, tokenid, appaddress, address, metatype: metaType })
  await doClose()
}
</script>

<template>
  <BsDialogWide :show="isShow" @close="doClose">
    <div sm:w-100>
      <div class="flex items-center">
        <div class="rounded-lg bg-gray-200  h-10 mr-2 overflow-hidden aspect-1">
          <BsBoxImg :src="useGet(metadata, 'image')" class="h-full object-cover object-center w-full group-hover:opacity-75" />
        </div>
        <h3 class="font-semibold flex-1 text-base text-gray-900 leading-6">
          #{{ tokenid }} {{ metadata.name }}
        </h3>
        <div>
          <BsLoadingIcon v-if="isTokenLoading" />
          <span v-else>
            {{ totalSupply }} / {{ maxSupply }}
          </span>
        </div>
      </div>
      <div mt-8>
        <div flex justify="between" items-center>
          <div>
            Basic Price
          </div>
          <div>
            {{ formatEther(basicPrice) }} $BST
          </div>
        </div>
        <div flex justify="between" items-center>
          <div>
            Mint Amount
          </div>
          <input id="amount" v-model="tokenMintModal.amount" type="text" name="amount" autocomplete="amount" class="rounded-md border-0 shadow-sm ring-inset my-2 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 w-20 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700">
        </div>
        <BsFormSelectBst v-model="mintCost" v-model:balance-enough="balanceEnough" my-4 space-y-4 border-y-gray-2 border-y-1 py-5>
          Total Cost
        </BsFormSelectBst>

        <BsBtnBlack w-full :disabled="!canSubmit" my-4 :is-loading="isLoading" @click="doSubmit">
          Mint
        </BsBtnBlack>
      </div>
    </div>
  </BsDialogWide>
</template>
