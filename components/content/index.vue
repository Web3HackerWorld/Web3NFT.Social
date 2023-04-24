<script setup lang="ts">
const { condition, chain, appaddress, tokenid, otpTokenId, requiredNFTCount } = $defineProps<{
  condition?: Object[]
  itemType?: String
  enableOneTimePayment?: Boolean
  encryptedString?: String
  encryptedSymmetricKey?: String
  oneTimePaymentBasicPrice?: Number
  oneTimePaymentMaxSupply?: Number
  tokenId?: String
  otpTokenId?: String
  requireNFTPass?: Boolean
  requiredNFTCount?: Number
  // other
  chain: string
  appaddress: string
  tokenid: string
}>()

const { showMintModal } = $(appStore())

const nftBalance = useTokenBalance($$(tokenid))
const otpBalance = useTokenBalance($$(otpTokenId))
const amount = $ref(10)
const textContent = $ref('')

let isLoading = $ref(false)
let status = $ref('')

const doUnlock = async () => {
  status = 'unlocking'
  isLoading = true
  const { doDecryptString } = litHelper({ chain: CHAIN_NAME })
  const { decryptedString } = await doDecryptString({ encryptedSymmetricKey: item.encryptedSymmetricKey, encryptedString: item.content, accessControlConditions: item.condition })

  item.content = decryptedString
  isLoading = false
  addSuccess('Unlock content success')
  console.log('====> unlock success :', decryptedString)
}

const nftPassMintParams = $computed(() => {
  return {
    amount: requiredNFTCount,
    tokenid,
    chain,
    appaddress,
  }
})

watchEffect(() => {
  if (!requiredNFTCount)
    return
  if (!tokenid)
    return

  // showMintModal(nftPassMintParams)
})
const optTokenMintParams = $computed(() => {
  return {
    amount: '1',
    tokenid: otpTokenId,
    chain,
    metaType: 'OTP',
    appaddress,
  }
})
</script>

<template>
  <div rounded-lg bg-gray-2 p-6 mt-5>
    <BsLoading v-if="isLoading" class="h-60" :is-loading="isLoading">
      <div>
        {{ status }}
      </div>
    </BsLoading>
    <div v-else my-10 text-center>
      <p text-xl my-10>
        The content is encrypted in Web3
      </p>
      <BsBtnBlack @click="showMintModal(nftPassMintParams)">
        Mint {{ requiredNFTCount }} NFT Pass to Unlock
      </BsBtnBlack>
      <div my-3 font-bold>
        Or
      </div>
      <BsBtnBlack @click="showMintModal(optTokenMintParams)">
        Mint 1 OTP-SBT to Unlock
      </BsBtnBlack>
    </div>
    <v-md-preview :text="textContent" />
  </div>
</template>
