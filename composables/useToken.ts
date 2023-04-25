const cacheMap = {}
export function useToken(tokenid) {
  const { contractRead, getJson } = $(web3AuthStore())
  let isLoading = $ref(true)

  let basicPrice = $ref(parseEther('0'))
  let totalSupply = $ref(0)
  let maxSupply = $ref(0)
  let metadata = $ref({})

  const doUpdate = async (isForce = false) => {
    const key = `token-${tokenid.value}`
    if (cacheMap[key] && !isForce) {
      isLoading = false
      basicPrice = cacheMap[key].basicPrice
      totalSupply = cacheMap[key].totalSupply
      maxSupply = cacheMap[key].maxSupply
      metadata = cacheMap[key].metadata
      return
    }
    isLoading = true
    const rz = await contractRead('BuidlerProtocol', 'getToken', tokenid.value.toString(), '', '')
    const _metadata = await getJson(rz.tokenURI)
    cacheMap[key] = {
      basicPrice: rz.basicPrice,
      totalSupply: rz.totalSupply,
      maxSupply: rz.maxSupply,
      metadata: _metadata,
    }

    isLoading = false
    basicPrice = cacheMap[key].basicPrice
    totalSupply = cacheMap[key].totalSupply
    maxSupply = cacheMap[key].maxSupply
    metadata = cacheMap[key].metadata
  }
  watchEffect(async () => {
    if (tokenid.value === undefined)
      return

    await doUpdate()
  })

  return $$({
    isLoading,
    basicPrice,
    totalSupply,
    maxSupply,
    metadata,
    doUpdate,
  })
}
