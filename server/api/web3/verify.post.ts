import { SiweMessage } from 'siwe'
import jwt from 'jsonwebtoken'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const { message, signature } = await readBody(event)
  const adminClient = serverSupabaseServiceRole(event)

  try {
    const siweMessage = new SiweMessage(message)
    const { nonce, address, chainId: chain } = await siweMessage.validate(signature)

    const { data, error } = await adminClient.from('nonce').select()
      .eq('address', address)
      .eq('chain', chain)
      .single()

    if (error)
      throw error

    if (nonce !== data.nonce)
      throw new Error('Invalid nonce.')

    await adminClient.from('nonce')
      .delete()
      .eq('nonce', nonce)

    let { data: user } = await adminClient.from('profile').select()
      .eq('address', address)
      .eq('chain', chain)
      .single()

    if (!user) {
      const { data, error } = await adminClient.from('profile').insert({
        address,
        chain,
      }).select().single()

      if (error)
        throw error

      user = data
    }

    const token = jwt.sign(
      {
        ...user,
        aud: 'authenticated',
        role: 'authenticated',
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      process.env.SUPABASE_JWT,
    )
    return { user, token }
  }
  catch (error) {
    return { error }
  }
})
