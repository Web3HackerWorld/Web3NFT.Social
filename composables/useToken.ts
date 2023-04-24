const cacheMap = {}
export function useToken(tokenid) {
  const { contractRead } = $(web3AuthStore())
  let isLoading = $ref(true)

  let basicPrice = $ref(parseEther('0'))
  let totalSupply = $ref(0)
  let maxSupply = $ref(0)

  watchEffect(async () => {
    if (tokenid.value === undefined)
      return

    const key = `token-${tokenid.value}`
    if (cacheMap[key]) {
      isLoading = false
      basicPrice = cacheMap[key].basicPrice
      totalSupply = cacheMap[key].totalSupply
      maxSupply = cacheMap[key].maxSupply
    }

    const rz = await contractRead('BuidlerProtocol', 'getToken', tokenid.value.toString(), '', '')
    cacheMap[key] = {
      basicPrice: rz.basicPrice,
      totalSupply: rz.totalSupply,
      maxSupply: rz.maxSupply,
    }
    isLoading = false
    basicPrice = cacheMap[key].basicPrice
    totalSupply = cacheMap[key].totalSupply
    maxSupply = cacheMap[key].maxSupply
  })

  return $$({
    isLoading,
    basicPrice,
    totalSupply,
    maxSupply,
  })
}
