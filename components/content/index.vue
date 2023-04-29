<script setup lang="ts">
interface Props {
  condition?: Object[]
  itemType?: String
  enableOneTimePayment?: Boolean
  encryptedString?: String
  encryptedSymmetricKey?: String
  itemid?: String
  tokenId?: String
  otpTokenId?: String
  requireNFTPass?: Boolean
  requiredNFTCount?: Number
  // other
  chain: string
  appaddress: string
  tokenid: string
}
let {
  condition, chain, appaddress, tokenid, otpTokenId, requiredNFTCount, encryptedSymmetricKey, encryptedString, itemid,
} = defineProps<Props>()

const { addLoading, addSuccess, alertError } = $(notificationStore())
const { doDecryptString } = litHelper({ chain: CHAIN_NAME })

const { data: nftBalance, doUpdate: updateNftBalance } = $(useTokenBalance($$(tokenid)))
const { data: otpBalance, doUpdate: updateOtpBalance } = $(useTokenBalance($$(otpTokenId)))

watchEffect(async () => {
  if (tokenid) 
    await updateNftBalance(true)
  

  if (otpTokenId) 
    await updateOtpBalance(true)
  
})
const mintNFTPassCount = $computed(() => requiredNFTCount - nftBalance)

const nftPassMintParams = $computed(() => {
  return {
    amount: mintNFTPassCount,
    tokenid,
    chain,
    appaddress,
    doClose: async () => {
      await updateNftBalance(true)
    },
  }
})

const optTokenMintParams = $computed(() => {
  return {
    amount: '1',
    tokenid: otpTokenId,
    chain,
    metaType: 'OTP',
    appaddress,
    doClose: async () => {
      await updateOtpBalance(true)
    },
  }
})

const { showMintModal } = $(appStore())

const canUnlock = $computed(() => {
  if (requiredNFTCount && requiredNFTCount <= nftBalance)
    return true
  if (otpBalance > 10)
    return true

  return false
})

const cacheKey = $computed(() => `${chain}-${appaddress}-${tokenid}-${itemid}`)

let textContent = $ref(getLsItem(cacheKey, ''))

let isUnlocking = $ref(false)
const doUnlock = async () => {
  if (!canUnlock)
    return

  isUnlocking = true
  const loadingItem = addLoading('Start unlocking content')
  const { decryptedString, err } = await doDecryptString({ encryptedSymmetricKey, encryptedString, accessControlConditions: condition })
  isUnlocking = false
  if (err)
    return alertError(err.toString(), false, loadingItem)

  textContent = decryptedString
  setLsItem(cacheKey, decryptedString)
  addSuccess('Unlock content successed!', loadingItem)
}
</script>

<template>
  <div>
    <v-md-preview v-if="textContent" :text="textContent" mt-10 />
    <div v-else text-center rounded-lg bg-gray-2 p-15 mt-10 mb-5>
      <p text-xl mb-10>
        The content is encrypted in Web3
      </p>
      <div v-if="canUnlock">
        <BsBtnBlack :is-loading="isUnlocking" @click="doUnlock">
          Unlock content
        </BsBtnBlack>
      </div>
      <div v-else>
        <BsBtnBlack @click="showMintModal(nftPassMintParams)">
          Mint {{ mintNFTPassCount }} NFT Pass to Unlock
        </BsBtnBlack>
        <div my-3 font-bold>
          Or
        </div>
        <BsBtnBlack @click="showMintModal(optTokenMintParams)">
          Mint 1 OTP-SBT to Unlock
        </BsBtnBlack>
      </div>
    </div>
  </div>
</template>
