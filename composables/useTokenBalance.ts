const cacheMap = {}
export function useTokenBalance(tokenid) {
  const { walletAddress, contractRead } = $(web3AuthStore())
  let data = $ref(0)
  
  const doUpdate = async (isForce = false) => {
    const key = `${walletAddress}-${tokenid.value}`
    if (cacheMap[key] && !isForce) {
      data = cacheMap[key]
      return
    }

    let balance = await contractRead('BuidlerProtocol', 'balanceOf', walletAddress, tokenid.value.toString())

    balance = +balance.toString()
    cacheMap[key] = balance
    data = balance
  }

  watchEffect(async () => {
    if (!walletAddress)
      return
    if (tokenid.value === undefined)
      return

    await doUpdate()
  })

  return $$({ data, doUpdate })
}
