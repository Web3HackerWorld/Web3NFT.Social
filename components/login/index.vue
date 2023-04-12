<script setup lang="ts">
import { SiweMessage } from 'siwe'
import { web3AuthStore } from '~/stores/web3AuthStore'
const { doConnect, walletAddress, web3Provider, isLoading, error, isShowLoginModal } = $(web3AuthStore())
const { auth } = $(useSupabaseAuthClient())
const binded = $ref(false)

// watchEffect(async () => {
//   if (!user)
//     return
//   const { data } = await client.from('web3Wallet').select().eq('user_id', user.id).single()
//   if (data.address)
//     binded = true
// })

const signInWithWeb3 = async () => {
  const address = walletAddress
  const chain = Number(CHAIN_ID)
  const { nonce, error: nonceError } = await $fetch('/api/web3/nonce', {
    method: 'POST',
    body: {
      address,
      chain,
    },
  })

  if (nonceError) {
    // show nonceError
    console.log('====> nonceError :', nonceError)
    return
  }

  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in with Web3 to the app.',
    uri: window.location.origin,
    version: '1',
    chainId: chain,
    nonce,
  })
  const signer = web3Provider.getSigner()
  const signature = await signer.signMessage(message.prepareMessage())
  const rz = await $fetch('/api/web3/verify', {
    method: 'POST',
    body: { message, signature },
  })
  console.log('====> rz :', rz)
  if (rz.address === address) {
    // bind success
  }
  else {
    console.log('====> err :', rz)
  }
}
</script>

<template>
  <BsDialogDefault :show="isShowLoginModal" @close="isShowLoginModal = false">
    <div class="min-w-sm space-y-6">
      <BsAlertError v-show="error" w-full>
        {{ error }}
      </BsAlertError>
      <div>
        <BsBtnBlack v-if="!walletAddress" :is-loading="isLoading" class="w-full" @click="doConnect">
          {{ isLoading ? 'Waiting for action in your MetaMask' : 'Connect to MetaMask' }}
        </BsBtnBlack>
        <span v-else class="flex space-x-3 min-w-0 items-center justify-between">
          <span class="flex flex-col flex-1 min-w-0">
            <span class="font-medium text-lg text-gray-900 truncate">{{ shortAddress(walletAddress) }}</span>
            <span class=" text-sm text-gray-500 truncate">Connected to MetaMask</span>
          </span>
          <BsBtnPlain @click="auth.signOut()">Disconnect</BsBtnPlain>
        </span>
      </div>
      <div v-if="walletAddress">
        <BsBtnBlack v-if="!binded" :is-loading="isLoading" class="w-full" @click="signInWithWeb3">
          {{ isLoading ? 'Waiting for action in your MetaMask' : 'Sign in with Web3' }}
        </BsBtnBlack>
      </div>
    </div>
  </BsDialogDefault>
</template>
