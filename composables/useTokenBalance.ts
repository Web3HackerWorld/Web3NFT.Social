const cacheMap = {}
export function useTokenBalance(tokenid) {
  const { walletAddress, contractRead } = $(web3AuthStore())
  let data = $ref(10)

  watchEffect(async () => {
    if (!walletAddress)
      return
    if (tokenid.value === undefined)
      return

    const key = `${walletAddress}-${tokenid.value}`
    if (cacheMap[key])
      data = cacheMap[key]

    const balance = await contractRead('BuidlerProtocol', 'balanceOf', walletAddress, tokenid.value.toString())
    cacheMap[key] = balance
    data = balance
  })

  return $$(data)
}
