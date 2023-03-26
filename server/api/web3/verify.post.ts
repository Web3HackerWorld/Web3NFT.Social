import { SiweMessage } from 'siwe'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async (event) => {
  const { message, signature } = await readBody(event)
  const client = serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const { data } = await client.from('web3Nonce').select().eq('user_id', user.id).single()

  if (!data.nonce)
    return { err: 'Please generate nonce first' }

  try {
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)

    if (fields.nonce !== data.nonce)
      return { err: 'Invalid nonce.' }

    // bind address to this account
    await client.from('web3Wallet').upsert({
      user_id: user.id,
      address: fields.address,
    })
    await client.from('web3Nonce').delete().eq('user_id', user.id)
    return fields
  }
  catch (error) {
    return error
  }
})
