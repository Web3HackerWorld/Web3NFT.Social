<script setup lang="ts">
const { appAddress, contractWrite, contractRead, getContractAddress, walletAddress: address, chain, addSuccess, alertSuccess, addError, addLoading } = $(web3AuthStore())
const { storeJson } = $(useNFTStorage())
const { supabase } = $(supabaseStore())
const { vendor } = $(appStore())

const router = useRouter()
const route = useRoute()
const tokenId = $computed(() => route.params.tokenId)

const { data: token } = $(await useLazyAsyncData(() => {
  return supabase.from('token').select()
    .eq('tokenid', tokenId)
    .eq('address', address)
    .eq('appaddress', appAddress)
    .eq('chain', chain)
    .single()
}, { watch: [$$(tokenId), $$(address)] }))

const title = $ref('Content Creation as NFT')
const excerpt = $ref('We create a platform that help users to make any content into NFT with token gating features as Web3 payment without any coding skill')
const content = $ref(`## Token && NFT gating
Creator can select NFT as gating

## SBT as one time payment
While creat the content, we also deploy an SBT for this article that only user mint one of the SBT can unlock the gated content.
This works like a Web2 application that readers can buy some stuff directly that do not require to be a subscriber of some membership.
`)
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

const itemType = $ref('Text')
const itemTypeList = $ref(['Text', 'Music', 'Video', 'Live'])

const requireNFTPass = $ref(true)
const requiredNFTCount = $ref(1)

const enableOneTimePayment = $ref(true)
const oneTimePaymentBasicPrice = $ref(5)
const oneTimePaymentMaxSupply = $ref(10000)

let isLoading = $ref(false)
let error = $ref('')
const doSubmit = async () => {
  if (isLoading)
    return
  isLoading = true

  const nextItemId = (await contractRead('BuidlerProtocol', 'getItemsCount', tokenId, '')).toString()

  let otpTokenId = ''
  if (enableOneTimePayment === true) {
    const loadingItem1 = addLoading('Start creating One Time Payment SBT')
    const inviteCommission = 100
    const otpCid = await storeJson({
      name: `OTP for ${nextItemId} in ${title} (${tokenId})`,
      description: excerpt,
      image: useGet(token, 'metadata.image'),
      properties: {
        category,
        tokenType: 'OTP',
        vendor,
        basicPrice: oneTimePaymentBasicPrice,
        maxSupply: oneTimePaymentMaxSupply,
        tokenMetadata: token.metadata,
      },
      external_url: '',
    })
    const tx = await contractWrite('BuidlerProtocol', 'addOTP', oneTimePaymentBasicPrice, inviteCommission, oneTimePaymentMaxSupply, otpCid, tokenId, nextItemId)
    const rc = await tx.wait()
    const event = rc.events.find(event => event.event === 'AddOTP')
    otpTokenId = event.args.tokenId.toString()
    addSuccess('Create One Time Payment SBT Successed!', loadingItem1)
  }

  let litRz = ''
  if (requireNFTPass || enableOneTimePayment) {
    const loadingItem2 = addLoading('Start encrypting your content with NFT Gating')
    const { doEncryptedString, generateCondition } = litHelper({ chain: CHAIN_NAME })
    const contractAddress = getContractAddress('BuidlerProtocol')
    const ownerAddress = address
    const nftPassCondition = generateCondition({ contractAddress, ownerAddress, tokenId, unlockAmount: requiredNFTCount })
    let condition = nftPassCondition
    if (otpTokenId) {
      const otpCondition = generateCondition({ contractAddress, ownerAddress, tokenId: otpTokenId, unlockAmount: '1' })
      condition = [
        ...nftPassCondition,
        {
          operator: 'or',
        },
        otpCondition[2],
      ]
    }

    litRz = await doEncryptedString(content, condition)
    litRz = {
      ...litRz,
      condition,
      requireNFTPass,
      requiredNFTCount,
      enableOneTimePayment,
      otpTokenId,
      oneTimePaymentBasicPrice,
      oneTimePaymentMaxSupply,
    }
    addSuccess('Encrypt your content with NFT Gating Successed!', loadingItem2)
  }

  const metadata = {
    title,
    excerpt,
    category,
    itemType,
    content,
  }
  if (requireNFTPass || enableOneTimePayment)
    metadata.content = litRz

  const loadingItem3 = addLoading('Start uploading the encrypt content onto IPFS')
  const cid = await storeJson(metadata)
  addSuccess('Upload the encrypt content onto IPFS Successed!', loadingItem3)

  const loadingItem4 = addLoading('Start submiting item data onto blockchain')
  const tx = await contractWrite('BuidlerProtocol', 'addItem', itemType, tokenId, cid)
  await tx.wait()
  addSuccess('Submit item data onto blockchain Successed!', loadingItem4)

  const loadingItem5 = addLoading('Start storing data into database for cache')

  const { error: dbError } = await supabase.from('item').insert({ metadata, chain, address, tokenid: tokenId, tokentype: token.tokentype, appaddress: appAddress, itemid: nextItemId, itemtype: itemType })
  if (dbError) {
    error = dbError
    addError('Store data into database failed!', loadingItem5)
    return
  }

  alertSuccess('Store data into database successed!', async () => {
    isLoading = false
    router.push(`/${chain}/${tokenId}`)
  }, loadingItem5)
}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  w-full  py-8">
    <div class="flex-1 text-base text-gray-700 leading-7">
      <input class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 pl-0 text-3xl text-gray-900 sm:text-4xl focus:outline-none" $="title" placeholder="Your creation title here">
      <div mt-5>
        <label font-medium text-sm mb-2 text-gray-900 leading-6 block for="excerpt">Excerpt</label>
        <div class="rounded-md border-gray-300 border-1  p-4 block">
          <resize-textarea
            id="excerpt"
            v-model="excerpt"
            w-full
            placeholder="Write some excerpt"
            :rows="2"
            :cols="4"
          />
        </div>
      </div>
      <div mt-5 flex justify="between">
        <div>
          <label for="category" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Category</label>
          <BsFormSelect id="category" $="category" :list="categoryList" min-w-60 :has-add-new="true" />
        </div>
        <div hidden>
          <label for="itemType" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Type</label>
          <BsFormSelect id="itemType" $="itemType" :list="itemTypeList" min-w-60 :has-add-new="false" />
        </div>
      </div>
      <div mt-5>
        <label font-medium text-sm mb-2 text-gray-900 leading-6 block>Content</label>
        <BsEditor v-model="content" height="400px" />
      </div>
      <h3 font-medium text-sm mb-2 text-gray-500 leading-6 block mt-10 pt-8 border-t border-gray-200>
        Payment
      </h3>
      <div mt-5>
        <BsFormToggle title="Enable Blog Pass NFT Gating" $="requireNFTPass">
          This encrypted content requires the reader to own your Blog's Pass NFT to unlock
        </BsFormToggle>
      </div>
      <div v-show="requireNFTPass" mt-2 flex justify="end" items-center>
        <label font-medium text-sm text-gray-600 leading-6 block>How many NFTs should the reader have?</label>
        <input id="requiredNFTCount" type="number" $="requiredNFTCount" name="requiredNFTCount" autocomplete="requiredNFTCount" class=" rounded-md border-0 shadow-sm ring-inset ml-4 py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 w-40 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6">
      </div>
      <div mt-5>
        <BsFormToggle title="Enable One Time Payment" $="enableOneTimePayment">
          Readers can pay for the content's SBT to unlock it, work as a one-time payment
        </BsFormToggle>
      </div>
      <div v-show="enableOneTimePayment" mt-2>
        <div mt-2 flex justify="end" items-center>
          <label font-medium text-sm text-gray-600 leading-6 block>How much $BST should the reader to pay for this SBT?</label>
          <div class="rounded-md flex shadow-sm ml-4">
            <input id="oneTimePaymentBasicPrice" type="number" $="oneTimePaymentBasicPrice" name="oneTimePaymentBasicPrice" class="rounded-none rounded-l-md border-0 flex-1 ring-inset min-w-0 py-1.5 pl-2 ring-1 ring-gray-300 text-gray-900 w-25 block placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
          </div>
        </div>
        <div mt-2 flex justify="end" items-center>
          <label font-medium text-sm text-gray-600 leading-6 block>Max Supply of the SBT? (0 as unlimit)</label>
          <div class="rounded-md flex shadow-sm ml-4">
            <input id="oneTimePaymentMaxSupply" type="number" $="oneTimePaymentMaxSupply" name="oneTimePaymentMaxSupply" class="rounded-md border-0 flex-1 ring-inset min-w-0 py-1.5 pl-2 ring-1 ring-gray-300 text-gray-900 w-25 block placeholder:text-gray-400 sm:text-sm sm:leading-6">
          </div>
        </div>
      </div>
      <BsAlertError v-if="error" my-5>
        {{ error.message }}
      </BsAlertError>
      <div class="flex pt-8 gap-x-3 justify-end" mt-5 border-t border-gray-200>
        <BsBtnBlack :is-loading="isLoading" @click="doSubmit">
          Save
        </BsBtnBlack>
      </div>
    </div>
  </div>
</template>
