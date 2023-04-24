const cacheMap = {}
export function useWeb3SupabaseData(table, query, isSingle = true) {
  const { supabase } = $(supabaseStore())
  let key = Object.keys(query).map(_key => `${_key}${query[_key].value}`).join('-')
  key = `${table}-${key}`
  let pending = $ref(true)
  let data = $ref(isSingle ? {} : [])

  if (cacheMap[key]) {
    pending = false
    data = cacheMap[key]
    return $$({
      data,
      pending,
    })
  }

  watchEffect(async () => {
    let $query = supabase.from(table).select()
    Object.keys(query).forEach((key) => {
      $query = $query.eq(key, query[key].value)
    })
    if (isSingle)
      $query = $query.single()

    const rz = await $query
    // console.log('====> key, rz :', key, rz)
    if (isSingle) {
      cacheMap[key] = {
        ...useGet(rz, 'data.metadata', {}),
        ...query,
        address: useGet(rz, 'data.address', ''),
      }
    }
    else {
      cacheMap[key] = rz.data
    }
    data = cacheMap[key]
    // console.log('====> key, data  :', key, data)

    pending = false
  })

  return $$({
    pending,
    data,
  })
}
