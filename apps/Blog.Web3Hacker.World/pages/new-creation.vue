<script setup>
const client = useSupabaseClient()
const user = $(useSupabaseUser())
const router = useRouter()

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
])

const theType = $ref('Text')
const typeList = $ref(['Text', 'Music', 'Video'])

const requireNFTPass = $ref(false)
const requiredNFTCount = $ref(1)

const enableOneTimePayment = $ref(false)
const oneTimePaymentAmount = $ref(1)

let status = $ref('Create a new SBT for your creation')

const wait = async (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => console.log(sec), 1000 * sec)
  })
}
const doSubmit = async () => {
  // store data into database
  const { data } = await client.from('web3Creation').upsert({ title, user_id: user.id, excerpt, content, category, requireNFTPass, requiredNFTCount, enableOneTimePayment, oneTimePaymentAmount }).select().single()
  console.log('====> data :', data)
  status = 'Create a new SBT for your creation'
  await wait(3)
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1  w-full max-w-2xl py-8">
    <BsForm :do-submit="doSubmit" :status="status">
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
            <label for="theType" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Type</label>
            <BsFormSelect id="theType" $="theType" :list="typeList" min-w-60 :has-add-new="false" />
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
        <div v-show="enableOneTimePayment" mt-2 flex justify="end" items-center>
          <label font-medium text-sm text-gray-600 leading-6 block>How much $BST should the reader pay for this SBT?</label>
          <div class="rounded-md flex shadow-sm ml-4">
            <input id="oneTimePaymentAmount" type="number" $="oneTimePaymentAmount" name="oneTimePaymentAmount" class="rounded-none rounded-l-md border-0 flex-1 ring-inset min-w-0 py-1.5 pl-2 ring-1 ring-gray-300 text-gray-900 w-25 block placeholder:text-gray-400 sm:text-sm sm:leading-6">
            <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
          </div>
        </div>
      </div>
    </BsForm>
  </div>
</template>
