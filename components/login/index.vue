<script setup lang="ts">
import { SiweMessage } from 'siwe'
import { web3AuthStore } from '~/stores/web3AuthStore'
let { doConnect, chain, walletAddress, appaddress, web3Provider, isLoading, error, isShowLoginModal, addSuccess } = $(web3AuthStore())

const { updateUser, token, doSignOut } = $(supabaseStore())

let status = $ref('')
const signInWithWeb3 = async () => {
  if (status !== '')
    return
  status = 'getNonce'
  const address = walletAddress
  const { nonce, error: nonceError } = await $fetch('/api/web3/nonce', {
    method: 'POST',
    body: {
      address,
      appaddress,
      chain,
    },
  })

  if (nonceError) {
    error = nonceError
    status = ''
    return
  }

  status = 'waitForSign'
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in with Web3 to the app.',
    uri: window.location.origin,
    version: '1',
    chainId: chain,
    nonce,
  })
  try {
    const signer = web3Provider.getSigner()
    const signature = await signer.signMessage(message.prepareMessage())
    status = 'verifySignature'
    const rz = await $fetch('/api/web3/verify', {
      method: 'POST',
      body: { message, signature, appaddress },
    })
    if (rz.error) { error = rz.error }
    else {
      error = ''
      addSuccess('Sign In Successed!')
      updateUser(rz)
      isShowLoginModal = false
    }
  }
  catch (err) {
    if (err.code === 4001) {
      error = 'You deny to sign the message'
    }
    else {
      error = err.message
      console.log('====> err :', err)
    }
  }

  status = ''
}

const signInBtnText = $computed(() => {
  // isDoSignIn ? 'Waiting for action in your MetaMask' :
  switch (status) {
    case 'getNonce':
      return 'General Nonce From Server'
    case 'waitForSign':
      return 'Waiting for your sign action from wallet'
    case 'verifySignature':
      return 'Waiting for server to verify signature'
    default:
      //
      break
  }
  return 'Sign in with Web3'
})
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

        </span>
      </div>
      <div v-if="walletAddress">
        <BsBtnBlack v-if="!token" :is-loading="status !== ''" class="w-full" @click="signInWithWeb3">
          {{ signInBtnText }}
        </BsBtnBlack>
        <BsBtnPlain v-else class="w-full" @click="doSignOut">
          Sign Out
        </BsBtnPlain>
      </div>
    </div>
  </BsDialogDefault>
</template>
