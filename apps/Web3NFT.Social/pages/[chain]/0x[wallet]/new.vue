<script setup lang="ts">
const { initContract, addLoading, addSuccess, walletAddress: address, appaddress, chain, initWeb3Force, storeJson } = $(web3AuthStore())

const {
  bstBalance,
  payTokenList,
  payTokenAddress,
  payBy,
  addTokenCost,
  currentAllowance,
  allowanceModal,
  distributor,
  queryAllowance,
  showAllowanceModal,
} = $(appStore())
const { supabase } = $(supabaseStore())

onMounted(initWeb3Force)

let error = $ref('')
const name = $ref('')
let description = $ref('')
description = ''
const image = $ref('')
const tokenType = 'Web3NFT.Social' // only this type be display on Web3NFT.Social
const category = $ref('Uncategory')
const categoryList = $ref([
  'Uncategory',
  'Productivity',
  'Fiction',
  'Visual Design',
  'Style',
  'Space',
  'Technology',
  'Programming',
  'Money',
  'Makers',
  'Cryptocurrency',
  'Art',
])
const tags = $ref('')
const basicPrice = $ref(100) // $BST
const maxSupply = $ref(10000)
const inviteCommission = $ref(1)

const parseTags = tags => tags.replace('，', ',').split(',')

let isLoading = $ref(false)

const doSubmit = async () => {
  if (currentAllowance.lt(addTokenCost)) {
    showAllowanceModal({
      amount: addTokenCost,
      doClose: async () => {
        await queryAllowance()
        allowanceModal.isShow = false
        if (!currentAllowance.lt(addTokenCost))
          await doSubmit()
      },
    })
    return
  }

  if (isLoading)
    return
  isLoading = true
  const loadingItem1 = addLoading('Start packing metadata on to IPFS')
  const properties = {
    category,
    tags: parseTags(tags),
    tokenType,
    distributor,
    basicPrice,
    maxSupply,
    inviteCommission,
  }
  const external_url = '' // This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
  const metadata = {
    name,
    description,
    image,
    properties,
    external_url,
  }
  const cid = await storeJson(metadata)
  addSuccess('Pack metadata on to IPFS successed!', loadingItem1)

  try {
    const loadingItem2 = addLoading('Start submitting to the blockchain')
    const contractWriterBP = await initContract('BuidlerProtocol', true)
    const tx = await contractWriterBP.addToken(tokenType, parseEther(basicPrice), inviteCommission * 100, maxSupply, cid, payTokenAddress)
    addSuccess('Submit to the blockchain successed!', loadingItem2)

    const loadingItem3 = addLoading('Waiting for the blockchain to excute the action')
    const rc = await tx.wait()
    const event = rc.events.find(event => event.event === 'AddToken')
    const tokenid = event.args.tokenId.toString()
    addSuccess('Excute the action on blockchain successed!', loadingItem3)

    const loadingItem4 = addLoading('Start storing data into database for cache')
    const { error: dbError } = await supabase.from('token').insert({ metadata, chain, address, tokenid, tokentype: tokenType, appaddress })
    if (dbError)
      throw dbError

    addSuccess('Store data into database successed!', loadingItem4)
    navigateTo(`/${chain}/${tokenid}`)
    description = ''
  }
  catch (err) {
    error = err
  }
  isLoading = false
}

const canSubmit = $computed(() => {
  if (
    name === ''
    || description === ''
    || image === ''
    || category === ''
  )
    return false

  if (bstBalance < addTokenCost)
    return false

  return true
})

useSeoMeta({
  title: 'New Creation',
})
</script>

<template>
  <div class="flex flex-col mx-auto flex-1 py-8 pb-20">
    <div class="flex-1 text-base text-gray-700 leading-7">
      <input class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 pl-0 text-3xl text-gray-900 sm:text-4xl focus:outline-none" v-model="name" placeholder="Your creation name">
      <div mt-5>
        <div class="rounded-md border-gray-300 border-1  p-4 pb-2 block">
          <resize-textarea
            id="description"
            v-model="description"
            w-full
            placeholder="Write some description"
            :rows="2"
            :cols="4"
          />
        </div>
      </div>
      <div class="mt-5 pb-10 sm:flex">
        <div flex-1 pr-5>
          <div>
            <label for="category" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Category</label>
            <BsFormSelect id="category" v-model="category" :list="categoryList" min-w-60 :has-add-new="true" />
          </div>
          <div mt-5>
            <label for="tags" class="font-medium text-sm text-slate-900 leading-6 block">Tags</label>
            <input id="tags" v-model="tags" type="text" name="tags" autocomplete="tags" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700" placeholder="Seperated by comma">
          </div>
          <div mt-5>
            <label for="basicPrice" class="font-medium text-sm text-slate-900 leading-6 block">Invest share basic price</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="basicPrice" type="text" v-model="basicPrice" name="basicPrice" autocomplete="basicPrice" class="rounded-none rounded-l-md flex-grow border-0 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-sky-500">
              <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
            </div>
          </div>
          <div mt-5>
            <label for="maxSupply" class="font-medium text-sm text-slate-900 leading-6 block">Invest share max supply</label>
            <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" autocomplete="maxSupply" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700">
          </div>
          <div mt-5 flex justify="between">
            <span font-bold>
              Total Valuation
            </span>
            <span>
              {{ maxSupply * basicPrice }} $BST
            </span>
          </div>
          <div mt-5 text-right text-gray-5 leading-5>
            10% of the sales revenue will be shared with these share investors according to the corresponding proportion
          </div>
        </div>
        <div class="mt-5 w-full aspect-2/3 sm:(w-1/2 mt-0 aspect-auto) ">
          <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block">Cover Image</label>
          <BsBoxBanner v-model="image" title="Cover Photo" class="h-full mt-2" />
        </div>
      </div>
      <div mt-5 border-t border-gray-200 pt-5 flex justify="between" items-center>
        <label class="font-bold text-sm mr-5 text-slate-900 leading-6 block">Create Creation Cost</label>
        <div>
          <div flex justify="end" items-center>
            <span text-xl mr-5>{{ formatEther(addTokenCost) }}</span>
            <BsFormSelect id="payBy" v-model="payBy" :list="payTokenList" />
          </div>
          <div mt-2>
            <span font-bold>Your balance:</span> {{ formatUnits(bstBalance) }} {{ payBy }}
          </div>
        </div>
      </div>
      <BsAlertError v-if="error" my-5>
        {{ error.message }}
      </BsAlertError>
      <div class="flex pt-8 gap-x-3 justify-end" mt-5 border-t border-gray-200>
        <BsBtnBlack :is-loading="isLoading" :disabled="!canSubmit" @click="doSubmit">
          Save
        </BsBtnBlack>
      </div>
    </div>
  </div>
</template>
