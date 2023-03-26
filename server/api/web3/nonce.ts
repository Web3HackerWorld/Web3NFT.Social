import { generateNonce } from 'siwe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = serverSupabaseClient(event)
  console.log('====> exist :', exist, user)
  const nonce = generateNonce()
  const { data, error } = await client.from('web3Nonce').insert([{ nonce }])
  console.log('====> data, error :', data, error)
  return { ok: true, nonce }
})
