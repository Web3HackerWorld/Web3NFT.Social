import { createClient } from '@supabase/supabase-js'

export const supabaseStore = defineStore('supabaseStore', () => {
  const { addSuccess, addLoading, doDisconnect } = $(web3AuthStore())
  const userCacheKey = 'supabase-user'
  const tokenCacheKey = 'supabase-user-jwt'
  const { public: { supabase: { url, key } } } = useRuntimeConfig()
  let user = $ref(getLsItem(userCacheKey, {}))
  let token = $ref(getLsItem(tokenCacheKey, ''))
  let supabase = $ref('')
  const metadata = $computed(() => user?.metadata || {})

  const updateUser = (data) => {
    user = data.user
    token = data.token
    setLsItem(userCacheKey, data.user)
    setLsItem(tokenCacheKey, data.token)
  }

  const doSignOut = () => {
    updateUser({
      user: {},
      token: '',
    })
    doDisconnect()
    addSuccess('Sign Out Successed!')
  }

  watchEffect(() => {
    if (token) {
      supabase = createClient(url, key, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    }
    else {
      supabase = createClient(url, key)
    }
  })

  const insertDataWithStatus = async (table, data) => {
    const loadingItem = addLoading('Start storing data into database for cache')
    const { error: dbError } = await supabase.from(table).insert(data)
    if (dbError)
      throw dbError

    addSuccess('Store data into database successed!', loadingItem)
  }

  return $$({ supabase, insertDataWithStatus, updateUser, user, token, doSignOut, metadata })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(supabaseStore, import.meta.hot))
