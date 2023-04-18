<script setup lang="ts">
const router = useRouter()

const route = useRoute()
const address = $computed(() => `0x${route.params.wallet}`)
const chain = $computed(() => route.params.chain)

const { supabase, updateUser, token } = $(supabaseStore())

const { storeJson, initContract, addSuccess, addLoading, alertError, alertSuccess, inviter, getTxUrl, initWeb3Force, appAddress } = $(web3AuthStore())

onMounted(initWeb3Force)
let isLoading = $ref(true)

const tabs = [
  { name: 'General', href: '#', current: true },
  // { name: 'Password', href: '#', current: false },
  // { name: 'Notifications', href: '#', current: false },
  // { name: 'Plan', href: '#', current: false },
  // { name: 'Billing', href: '#', current: false },
  // { name: 'Team Members', href: '#', current: false },
]

let profile = $ref({
  avatar: '',
  cover: '',
  firstname: '',
  lastname: '',
  bio: '',
  twitter: '',
  github: '',
})
profile = {
  avatar: 'ipfs://bafkreiah3vy3ul2hv3xn3pnl425rqk3skaqz2pmphgzjidphvhqpvaompa',
  bio: 'Web3Hacker',
  cover: 'ipfs://bafybeibuw3alqp53mzio22g7teqwbazwwvllmjctzsedytc2bqoiozvobq',
  firstname: 'Bruce',
  github: 'https://github.com/Web3HackerWorld',
  lastname: 'Wayne',
  twitter: 'https://twitter.com/Web3HackerWorld',
}
const { data: userData } = await supabase.from('profile')
  .select()
  .eq('chain', chain)
  .eq('address', address)
  .eq('appaddress', appAddress)
  .single()

isLoading = false

if (userData?.metadata) {
  profile = {
    ...profile,
    ...userData.metadata,
  }
}

const saveToSupabase = async () => {
  const loadingItem = addLoading('Start Saving to cache layer')
  const data = {
    id: userData.id,
    updated_at: new Date(),
    metadata: profile,
  }

  const { error, data: newUserData } = await supabase.from('profile').update(data)
    .eq('chain', chain)
    .eq('address', address)
    .eq('appaddress', appAddress)
    .select().single()
  if (error)
    throw error

  addSuccess('Save to cache layer successed!', loadingItem)
  updateUser({
    user: newUserData,
    token,
  })
  return newUserData
}

const saveToContract = async (data) => {
  const contractWriter = await initContract('BuidlerProtocol', true)

  const loadingItem1 = addLoading('Saving public meta data on to IPFS')
  const cid = await storeJson(data)
  addSuccess('Save to IPFS successed!', loadingItem1)

  const loadingItem2 = addLoading(`Saving to BuidlerProtocol on Chain ${CHAIN_NAME} ${CHAIN_ID}`)
  const tx = await contractWriter.updateBuidler(inviter, cid)
  const rc = await tx.wait()
  const txLink = getTxUrl(rc.transactionHash)
  addSuccess(`Save to BuidlerProtocol on Chain successed! tx link: ${txLink}`, loadingItem2, 10)
}

const canSubmit = $computed(() => !useSome(profile, val => val === ''))

const doSubmit = async () => {
  if (isLoading)
    return

  isLoading = true
  try {
    const userProfileData = await saveToSupabase()
    await saveToContract(userProfileData)
  }
  catch (error) {
    alertError(error)
    return
  }

  alertSuccess('Update profile success', async () => {
    isLoading = false
    // go to profile page
    router.push(`/${chain}/${address}`)
  })
}
</script>

<template>
  <div class="flex flex-col mx-auto  max-w-5xl">
    <div class="pt-10 pb-16">
      <h1 class="font-bold tracking-tight text-3xl text-gray-900">
        Settings
      </h1>
      <div class="w-full py-6">
        <!-- Tabs -->
        <div class="lg:hidden">
          <label for="selected-tab" class="sr-only">Select a tab</label>
          <select id="selected-tab" name="selected-tab" class="rounded-md border-0 ring-inset mt-1 w-full py-1.5 pr-10 pl-3 ring-1 ring-gray-300 text-gray-900 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-500">
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden lg:block">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px space-x-8">
              <a v-for="tab in tabs" :key="tab.name" :href="tab.href" class="font-medium border-b-2 text-sm py-4 px-1 whitespace-nowrap" :class="[tab.current ? 'border-gray-700 text-gray-800' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">{{ tab.name }}</a>
            </nav>
          </div>
        </div>

        <form class="divide-y space-y-8 divide-y-slate-200 mt-6">
          <div class="grid gap-y-6 grid-cols-1 sm:gap-x-6 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <h2 class="font-medium text-xl text-slate-900">
                Profile
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div sm:(col-span-6 flex justify-between)>
              <BsBoxAvatar $="profile.avatar" size="small" title="Avatar" mr-15 />

              <div mt-6 sm:mt-0 flex-1>
                <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block">Cover photo</label>
                <BsBoxBanner $="profile.cover" title="Cover Photo" class="mt-2 aspect-4/1" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="first-name" class="font-medium text-sm text-slate-900 leading-6 block">First name</label>
              <input id="first-name" $="profile.firstname" type="text" name="first-name" autocomplete="first-name" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="font-medium text-sm text-slate-900 leading-6 block">Last name</label>
              <input id="last-name" $="profile.lastname" type="text" name="last-name" autocomplete="last-name" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="sm:col-span-6">
              <label for="description" class="font-medium text-sm text-slate-900 leading-6 block">BIO</label>
              <div class="mt-2">
                <textarea id="description" $="profile.bio" name="description" rows="4" class="rounded-md border-0 shadow-sm ring-inset w-full p-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:py-1.5 sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500" />
              </div>
              <p class="mt-3 text-sm text-slate-500">
                Brief description for your profile. Simple markdown support.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label for="twitter" class="font-medium text-sm text-slate-900 leading-6 block">Twitter</label>
              <div class="rounded-md flex shadow-sm mt-2">
                <input id="twitter" type="text" $="profile.twitter" name="twitter" placeholder="https://twitter.com/xxxx" autocomplete="twitter" class="rounded-md border-0 flex-1 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="github" class="font-medium text-sm text-slate-900 leading-6 block">GitHub</label>
              <div class="rounded-md flex shadow-sm mt-2">
                <input id="github" type="text" $="profile.github" name="github" placeholder="https://github.com/xxxx" autocomplete="github" class="rounded-md border-0 flex-1 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <div class="flex pt-8 gap-x-3 justify-end">
            <BsBtnBlack :is-loading="isLoading" :disabled="!canSubmit" @click="doSubmit">
              Save
            </BsBtnBlack>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
