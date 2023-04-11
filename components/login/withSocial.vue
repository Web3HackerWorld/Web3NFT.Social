<script setup lang="ts">
import { SiweMessage, generateNonce } from 'siwe'
import {web3AuthStore} from '~/stores/web3AuthStore'

const { doConnect, walletAddress, web3Provider, isLoading, error, isShowLoginModal } = $(web3AuthStore())
const user = $(useSupabaseUser())
const client = useSupabaseClient()
const { auth } = $(useSupabaseAuthClient())
const avatar = $computed(() => user?.user_metadata.avatar_url)
const name = $computed(() => user?.user_metadata.full_name)
let binded = $ref(false)

watchEffect(async () => {
  if (!user)
    return
  const { data } = await client.from('web3Wallet').select().eq('user_id', user.id).single()
  if (data.address)
    binded = true
})
const doBind = async () => {
  let nonce = ''
  // request nonce
  const { data } = await client.from('web3Nonce').select().eq('user_id', user.id).single()
  if (!data) {
    nonce = generateNonce()
    const { data } = await client.from('web3Nonce').upsert({ nonce, user_id: user.id }).select().single()
    console.log('====> data :', data)
  }
  else {
    console.log('====> exist :', data)
    nonce = data.nonce
  }

  // call sign
  const message = new SiweMessage({
    domain: window.location.host,
    address: unref(walletAddress),
    statement: 'Sign in with Ethereum to the app.',
    uri: window.location.origin,
    version: '1',
    chainId: Number(CHAIN_ID),
    nonce,
  })
  const signer = web3Provider.getSigner()
  const signature = await signer.signMessage(message.prepareMessage())
  // // Verify signature
  const rz = await $fetch('/api/web3/verify', {
    method: 'POST',
    body: { message, signature },
  })

  if (rz.address === walletAddress) {
    // bind success
  }
  else {
    console.log('====> err :', rz)
  }
}
</script>

<template>
  <BsDialogDefault :show="isShowLoginModal" @close="isShowLoginModal = false">
    <div class="flex flex-col min-h-full py-12 justify-center sm:max-w-lg sm:px-6 lg:px-8">
      <div class="sm:mx-auto  sm:w-full">
        <h2 class="font-bold mt-6 text-center tracking-tight text-3xl text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full">
        <div class="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <div v-if="user" mt-6>
            <span class="flex space-x-3 min-w-0 items-center justify-between">
              <img class="rounded-full bg-gray-300 flex-shrink-0 h-10 w-10" :src="avatar" alt="">
              <span class="flex flex-col flex-1 min-w-0">
                <span class="font-medium text-sm text-gray-900 truncate">{{ name }}</span>
              </span>
              <BsBtnPlain @click="auth.signOut()">Logout</BsBtnPlain>
            </span>
          </div>
          <div v-else class="mt-6 grid gap-3 grid-cols-3">
            <div>
              <button class="bg-white rounded-md shadow-sm ring-inset w-full py-2 px-4 ring-1 ring-gray-300 text-gray-500 inline-flex justify-center hover:bg-gray-50 focus:outline-offset-0" @click="auth.signInWithOAuth({ provider: 'google' })">
                <span class="sr-only">Sign in with Google</span>
                <span i-logos-google-icon h-5 w-5 />
              </button>
            </div>

            <div>
              <button class="bg-white rounded-md shadow-sm ring-inset w-full py-2 px-4 ring-1 ring-gray-300 text-gray-500 inline-flex justify-center hover:bg-gray-50 focus:outline-offset-0" @click="auth.signInWithOAuth({ provider: 'twitter' })">
                <span class="sr-only">Sign in with Twitter</span>
                <span i-logos-twitter h-5 w-5 />
              </button>
            </div>

            <div>
              <button class="bg-white rounded-md shadow-sm ring-inset w-full py-2 px-4 ring-1 ring-gray-300 text-gray-500 inline-flex justify-center hover:bg-gray-50 focus:outline-offset-0" @click="auth.signInWithOAuth({ provider: 'github' })">
                <span class="sr-only">Sign in with GitHub</span>
                <span i-logos-github-icon h-5 w-5 />
              </button>
            </div>
          </div>

          <div v-if="user" class="space-y-6 mt-10" action="#" method="POST">
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
              <BsBtnBlack v-if="!binded" :is-loading="isLoading" class="w-full" @click="doBind">
                {{ isLoading ? 'Waiting for action in your MetaMask' : 'Bind your wallet address with social account' }}
              </BsBtnBlack>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BsDialogDefault>
</template>
