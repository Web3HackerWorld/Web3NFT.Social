import * as LitJsSdk from '@lit-protocol/lit-node-client'
// import LitJsSdk from 'lit-js-sdk'

export const litHelper = async({ chain, litNodeClient }) => {
  const doEncryptedString = async(content, accessControlConditions) => {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      content,
    )
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey, // Uint8Array
      authSig,
      chain,
      permanent: false,
    })

    // it's a Uint8Array, turn it into a hex string now
    function blobToDataURL(blob) {
      return new Promise((resolve) => {
        const a = new FileReader()
        a.onload = function(e) { resolve(e.target.result) }
        a.readAsDataURL(blob)
      })
    }
    return {
      encryptedString: await blobToDataURL(encryptedString),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'),
    }
  }

  const doDecryptString = async(encryptedSymmetricKey, encryptedString, accessControlConditions) => {
    const toDecrypt = encryptedSymmetricKey
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    try {
      const symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig,
      })

      function dataURLtoBlob(dataUrl) {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
        while (n--)
          u8arr[n] = bstr.charCodeAt(n)

        return new Blob([u8arr], { type: mime })
      }

      encryptedString = dataURLtoBlob(encryptedString)

      const decryptedString = await LitJsSdk.decryptString(
        encryptedString,
        symmetricKey,
      )
      // console.log('====> decryptedString :', decryptedString)

      return { decryptedString }
    }
    catch (err) {
      console.log('====> err :', err)
      return { err }
    }
  }

  const generateCondition = ({ contractAddress, walletAddress, tokenId, unlockAmount }) => {
    const myselfCondition = {
      contractAddress: '',
      standardContractType: '',
      chain,
      method: '',
      parameters: [
        ':userAddress',
      ],
      returnValueTest: {
        comparator: '=',
        value: walletAddress,
      },
    }
    const currentNFTCondition = {
      contractAddress,
      standardContractType: 'ERC1155',
      chain,
      method: 'balanceOf',
      parameters: [
        ':userAddress',
        tokenId,
      ],
      returnValueTest: {
        comparator: '>=',
        value: unlockAmount,
      },
    }

    const accessControlConditions = [
      myselfCondition,
      {
        operator: 'or',
      },
      currentNFTCondition,
    ]

    return accessControlConditions
  }

  return {
    doEncryptedString,
    doDecryptString,
    generateCondition,
  }
}
