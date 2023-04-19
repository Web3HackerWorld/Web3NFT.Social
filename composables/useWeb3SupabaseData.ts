export function useWeb3SupabaseData(table, query, isSingle = true) {
  const { supabase } = $(supabaseStore())
  let key = Object.keys(query).map(_key => `${_key}${query[_key]}`).join('-')
  key = `${table}-${key}`
  const watchArr = Object.keys(query).map(key => $$(query[key]))
  return useAsyncData(key, async () => {
    let $query = supabase.from(table).select()
    Object.keys(query).forEach((key) => {
      $query = $query.eq(key, query[key].value)
    })
    if (isSingle)
      $query = $query.single()

    const { data } = await $query
    return data
  }, { watch: watchArr })
}
