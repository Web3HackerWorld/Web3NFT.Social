export const litHelper = ({ chain }) => {
  const doEncryptedString = async (content, accessControlConditions) => {
    const authSig = await LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk_litNodeClient.encryptString(
      content,
    )
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey, // Uint8Array
      authSig,
      chain,
      permanent: false,
    })

    return {
      encryptedString: await LitJsSdk_litNodeClient.blobToBase64String(encryptedString),
      encryptedSymmetricKey: LitJsSdk_litNodeClient.uint8arrayToString(encryptedSymmetricKey, 'base16'),
    }
  }

  const doDecryptString = async ({ encryptedSymmetricKey, encryptedString, accessControlConditions }) => {
    const toDecrypt = encryptedSymmetricKey
    accessControlConditions = JSON.stringify(accessControlConditions)
    accessControlConditions = JSON.parse(accessControlConditions)

    const authSig = await LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain })

    try {
      const symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig,
      })
      const blob = LitJsSdk_litNodeClient.base64StringToBlob(encryptedString)
      const decryptedString = await LitJsSdk_litNodeClient.decryptString(blob, symmetricKey)
      console.log('====> decryptedString :', decryptedString)

      return { decryptedString }
    }
    catch (err) {
      console.log('====> err :', err)
      return { err }
    }
  }

  const generateCondition = ({ contractAddress, ownerAddress, tokenId, unlockAmount }) => {
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
        value: ownerAddress,
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
        value: `${unlockAmount}`,
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
