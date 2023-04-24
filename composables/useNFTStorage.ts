import { NFTStorage } from 'nft.storage'

export function useNFTStorage() {
  const NFT_STORAGE_TOKEN
    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MTgzMDU2MywibmFtZSI6Ik5UQiJ9.Yj9ie65LXh6t6QECtGzKViX-AeTiAHnVoYybY3qfqNk'
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
  const { addSuccess, addLoading } = $(notificationStore())

  const checkExist = async (file) => {
    try {
      const { cid } = await NFTStorage.encodeBlob(file)
      const isExist = await client.check(cid)
      if (isExist) {
        return {
          cid: `ipfs://${cid}`,
        }
      }
    }
    catch (err) {
      // nothing todo, as the file just do not store yet
      return false
    }
  }

  const storeBlob = async (file) => {
    const cid = await client.storeBlob(file)
    return `ipfs://${cid}`
  }

  const storeNFTMetadata = async (data) => {
    const metadata = await client.store(data)
    return metadata
  }

  const storeJson = async (data) => {
    data = unref(data)
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    })
    const isExist = await checkExist(blob)
    if (isExist)
      return isExist.cid

    return storeBlob(blob)
  }

  const storeJsonWithStatus = async (data) => {
    const loadingItem = addLoading('Start pack metadata on to IPFS')
    const cid = await storeJsonWithStatus(data)
    addSuccess('Pack metadata on to IPFS successed!', loadingItem)
    return cid
  }

  // https://api.nft.storage/bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u
  const getInfo = async (cid) => {
    const url = cid.replace('ipfs://', 'https://api.nft.storage/')
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
      },
    })
    return response.json()
  }
  const getIpfsUrl = cid => `${cid.replace('ipfs://', 'https://')}.ipfs.nftstorage.link/`

  const getJson = async (cid) => {
    if (!cid)
      return false
    if (!(cid.startsWith('ipfs://') || cid.startsWith('http')))
      cid = `ipfs://${cid}`

    let data = getLsItem(cid, false)
    if (data)
      return data

    let url = cid
    if (url.startsWith('ipfs://'))
      url = getIpfsUrl(cid)

    const response = await fetch(url)

    data = await response.json()
    setLsItem(cid, data)
    return data
  }

  const getStatus = async (cid) => {
    const key = `status-${cid}`
    let status = getLsItem(key, false)
    if (status)
      return status
    status = await client.status(cid.replace('ipfs://', ''))
    setLsItem(key, status)
    return status
  }

  return { checkExist, storeBlob, client, storeNFTMetadata, storeJson, getInfo, getJson, getStatus, getIpfsUrl, storeJsonWithStatus }
}
