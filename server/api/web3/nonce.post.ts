import { generateNonce } from 'siwe'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const { address, chain, appaddress: appaddress } = await readBody(event)
  if (!address)
    return { err: 'walletAddress is Invalid' }
  if (!chain)
    return { err: 'chain is Invalid' }
  if (!appaddress)
    return { err: 'appaddress is Invalid' }

  const nonce = generateNonce()

  const adminClient = serverSupabaseServiceRole(event)
  const db = adminClient.from('nonce')
  const { data: isExist } = await db.select()
    .eq('address', address)
    .eq('chain', chain)
    .eq('appaddress', appaddress)
    .single()

  if (isExist) {
    // update
    const { error } = await db.update({ nonce })
      .eq('address', address)
      .eq('chain', chain)
      .eq('appaddress', appaddress)

    if (error)
      return { error }
  }
  else {
    // insert new
    const { error } = await db.insert({ nonce, address, chain, appaddress })
    if (error)
      return { error }
  }

  return { nonce }
})
