<script setup lang="ts">
const { initContract, userData, getContractAddress, walletAddress } = $(web3AuthStore())
const { storeJson } = $(useNFTStorage())
const client = useSupabaseClient()
const user = $(useSupabaseUser())
const router = useRouter()

const name = $ref('')
const description = $ref('')
const content = $ref(`## Token && NFT gating
Creator can select NFT as gating

## SBT as one time payment
While creat the content, we also deploy an SBT for this article that only user mint one of the SBT can unlock the gated content.
This works like a Web2 application that readers can buy some stuff directly that do not require to be a subscriber of some membership.
`)

const image = $ref('')
const tokenType = 'Web3Blog' // only this type be display on Web3Blog.World
const category = $ref('Uncategory')
const categoryList = $ref([
  'Uncategory',
])
const tags = $ref('')

const basicPrice = $ref(100) // $BST
const maxSupply = $ref(10000)

const enableOneTimePayment = $ref(false)
const oneTimePaymentAmount = $ref(1)
let status = $ref('Create a new SBT for your creation')

const tokenId = '13' // current project/app id

const doSubmit = async () => {
  const value = parseEther('0.0001')
  status = '1. Creating One Time Payment SBT token'
  // const cid = await storeJson({
  //   userData,
  //   title,
  //   image,
  //   excerpt,
  // })
  // const contractWriterCCANSBT = await initContract('CCANSBT', true)
  // const txSBT = await contractWriterCCANSBT.upsertBlog([
  //   title,
  //   excerpt,
  //   image,
  //   cid,
  // ], { value })
  // const rcSBT = await txSBT.wait()
  // const event = rcSBT.events.find(event => event.event === 'UpsertBlog')
  // // one time payment sbt token Id
  // const otpSbtTokenId = event.args[0].toString()
  const otpSbtTokenId = '3'
  console.log('====>success 1. otpSbtTokenId  :', otpSbtTokenId)

  status = '2. Encrypt your content via LIT'
  const { doEncryptedString, generateCondition } = litHelper({ chain: CHAIN_NAME })

  const nftPassCondition = generateCondition({ contractAddress: getContractAddress('BuidlerProtocol'), walletAddress, tokenId, unlockAmount: requiredNFTCount })
  const sbtCondition = generateCondition({ contractAddress: getContractAddress('CCANSBT'), walletAddress, tokenId: otpSbtTokenId, unlockAmount: oneTimePaymentAmount })
  const condition = [
    ...nftPassCondition,
    // {
    //   operator: 'or',
    // },
    // sbtCondition[2],
  ]
  const { encryptedString, encryptedSymmetricKey } = await doEncryptedString(content, condition)
  console.log('====>success 2. LIT: encryptedString, encryptedSymmetricKey :', encryptedString, encryptedSymmetricKey)
  const itemType = 'Blog'

  status = '3. upload the encrypt article information onto IPFS'
  const cidArticle = await storeJson({
    userData,
    title,
    image,
    excerpt,
    content: {
      encryptedString,
      encryptedSymmetricKey,
      condition,
    },
    otpSbtTokenId,
    requiredNFTCount,
    oneTimePaymentAmount,
  })
  console.log('====>success 3. upload to ipfs :', cidArticle)
  const contractWriterBP = await initContract('BuidlerProtocol', true)
  const tx = await contractWriterBP.addItem(itemType, tokenId, cidArticle)
  const rc = await tx.wait()
  console.log('====> rc :', rc)
  // // store data into database
  status = 'store data into database for cache only'
  const { data } = await client.from('web3Creation').upsert({ title, user_id: user.id, excerpt, content: encryptedString, category, requireNFTPass, requiredNFTCount, enableOneTimePayment, oneTimePaymentAmount, encryptedSymmetricKey, otpSbtTokenId, condition }).select().single()
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1 py-8">
    <BsForm :do-submit="doSubmit" :status="status">
      <div class="flex-1 text-base text-gray-700 leading-7">
        <input class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 pl-0 text-3xl text-gray-900 sm:text-4xl focus:outline-none" $="name" placeholder="Your book name">
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
        <div class="flex mt-5 pb-10">
          <div flex-1 pr-5>
            <div>
              <label for="category" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Category</label>
              <BsFormSelect id="category" $="category" :list="categoryList" min-w-60 :has-add-new="true" />
            </div>
            <div mt-5>
              <label for="tags" class="font-medium text-sm text-slate-900 leading-6 block">Tags</label>
              <input id="tags" $="tags" type="text" name="tags" autocomplete="tags" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700" placeholder="Seperate by comma">
            </div>
            <div mt-5>
              <label for="basicPrice" class="font-medium text-sm text-slate-900 leading-6 block">Invest share basic price</label>
              <div class="rounded-md flex shadow-sm mt-2">
                <input id="basicPrice" type="text" $="basicPrice" name="basicPrice" autocomplete="basicPrice" class="rounded-none rounded-l-md flex-grow border-0 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-sky-500">
                <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
              </div>
            </div>
            <div mt-5>
              <label for="maxSupply" class="font-medium text-sm text-slate-900 leading-6 block">Invest share max supply</label>
              <input id="maxSupply" $="maxSupply" type="text" name="maxSupply" autocomplete="maxSupply" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700">
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
          <div class="w-1/2">
            <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block">Cover photo</label>
            <BsBoxBanner $="image" title="Cover Photo" class="h-full mt-2" />
          </div>
        </div>
      </div>
    </BsForm>
  </div>
</template>
