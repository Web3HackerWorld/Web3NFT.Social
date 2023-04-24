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

const { chain, appaddress, tokenid, metaType, amount } = $(tokenMintModal)
const { walletAddress: address, storeJsonWithStatus, bpAction } = $(web3AuthStore())
const { insertDataWithStatus } = $(supabaseStore())

const { data: token } = $(await useWeb3SupabaseData('token', $$({ chain, tokenid, appaddress }), true))

const { basicPrice, totalSupply, maxSupply, isLoading: isTokenLoading } = $(useToken($$(tokenid)))

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
  console.log('====> rc :', rc)
  await insertDataWithStatus('meta', { metadata, chain, tokenid, appaddress, address, metatype: metaType })
}
</script>

<template>
  <BsDialogWide :show="tokenMintModal.isShow" @close="tokenMintModal.doClose">
    <div sm:w-100>
      <div class="flex items-center">
        <div class="rounded-lg bg-gray-200  h-10 mr-2 overflow-hidden aspect-1">
          <BsBoxImg :src="useGet(token, 'image')" class="h-full object-cover object-center w-full group-hover:opacity-75" />
        </div>
        <h3 class="font-semibold flex-1 text-base text-gray-900 leading-6">
          #{{ tokenid }} {{ token.name }}
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
          <input id="amount" $="tokenMintModal.amount" type="text" name="amount" autocomplete="amount" class="rounded-md border-0 shadow-sm ring-inset my-2 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 w-20 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700">
        </div>
        <BsFormSelectBst $="mintCost" $balance-enough="balanceEnough" my-4 space-y-4 border-y-gray-2 border-y-1 py-5>
          Total Cost
        </BsFormSelectBst>

        <BsBtnBlack w-full :disabled="!canSubmit" my-4 @click="doSubmit">
          Mint
        </BsBtnBlack>
      </div>
    </div>
  </BsDialogWide>
</template>
