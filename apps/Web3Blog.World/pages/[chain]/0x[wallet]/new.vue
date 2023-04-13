<script setup lang="ts">
const { initContract, addLoading, addSuccess, walletAddress: address, chain, initWeb3Force, storeJson } = $(web3AuthStore())
const { supabase } = $(supabaseStore())
const router = useRouter()

onMounted(initWeb3Force)

const name = $ref('皮囊与灵魂写的故事')
const description = $ref('好看的皮囊和有趣的灵魂在 Web3 里面写了一部关于一个半吊子程序员意外获得 超级 NFT 灵石助力后修仙打怪练级，最后统一了多元宇宙的瞎扯淡的故事')
const image = $ref('')
const vendor = 'Web3Blog.World'
const tokenType = 'Web3Blog' // only this type be display on Web3Blog.World
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
const tags = $ref('修仙, 搞怪, 无厘头, Web3, 多元宇宙')
const basicPrice = $ref(100) // $BST
const maxSupply = $ref(10000)
const inviteCommission = $ref(1)
const payTokenList = $ref(['$BSTw', '$BSTs'])
const payBy = $ref('$BSTw')
const payTokenAddress = $ref('')

const parseTags = tags => tags.replace('，', ',').split(',')

let isLoading = $ref(false)
const doSubmit = async () => {
  if (isLoading)
    return
  isLoading = true

  const loadingItem1 = addLoading('Start packing metadata on to IPFS')
  const properties = {
    category,
    tags: parseTags(tags),
    tokenType,
    vendor,
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
  const rz = await supabase.from('token').insert({ metadata, chain, address, tokenid })
  console.log('====> rz :', rz)
  addSuccess('Store data into database successed!', loadingItem4)
  router.push(`/${chain}/${tokenid}`)
}

const canSubmit = $computed(() => {
  if (
    name === ''
    || description === ''
    || image === ''
    || category === ''
  )
    return false

  return true
})
</script>

<template>
  <div class="flex flex-col mx-auto flex-1 py-8">
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
            <input id="tags" $="tags" type="text" name="tags" autocomplete="tags" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700" placeholder="Seperated by comma">
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
      <div mt-5 border-t border-gray-200 pt-5>
        <div flex justify="end" items-center>
          <label class="font-medium text-sm mr-5 text-slate-900 leading-6 block">Create Token Cost</label>
          <span text-xl mr-2>1</span> $BST
        </div>
        <div flex justify="end" items-center mt-2>
          <label for="payBy" class="font-medium text-sm mr-5 text-slate-900 leading-6 block"> Pay By</label>
          <BsFormSelect id="payBy" $="payBy" :list="payTokenList" />
        </div>
      </div>
      <div class="flex pt-8 gap-x-3 justify-end" mt-5 border-t border-gray-200>
        <BsBtnBlack :is-loading="isLoading" :disabled="!canSubmit" @click="doSubmit">
          Save
        </BsBtnBlack>
      </div>
    </div>
  </div>
</template>
