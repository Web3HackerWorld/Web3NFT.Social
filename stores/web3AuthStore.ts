import { ethers } from 'ethers'
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider'
import { CHAIN_MAP } from '~/constants/CHAIN'
const chainId = import.meta.env.VITE_CHAIN_ID
const chainMap = CHAIN_MAP
let onboarding: MetaMaskOnboarding = null

export const web3AuthStore = defineStore('web3AuthStore', () => {
  const { addSuccess, addError, addWarning, addLoading, alertError, alertSuccess } = $(notificationStore())
  const { getJson, storeJson, storeJsonWithStatus } = $(useNFTStorage())
  const { doIdentify } = $(useLogRocket())
  const inviter = '0xC6E58fb4aFFB6aB8A392b7CC23CD3feF74517F6C'
  const chain = $computed(() => Number(chainId))
  let error = $ref('')
  let isLoading = $ref(false)

  const getContractAddress = contractName => useGet(CONTRACT_ADDRESS_MAP, `${contractName}.${CHAIN_ID}`)
  const appaddress = getContractAddress('BuidlerProtocol')

  const doOnboard = async () => {
    onboarding.startOnboarding()
  }

  // new version
  let accounts = $ref([])
  let userBalanceRaw = $ref(0)
  const userBalance = $computed(() => formatUnits(userBalanceRaw))
  const walletAddress = $computed(() => {
    if (accounts[0])
      return formatAddress(accounts[0])

    return ''
  })
  let userData = $ref(getLsItem('userData', {}))
  let isShowLoginModal = $ref(false)
  let isShowChainSwitchModal = $ref(false)
  let isShowOnboardModal = $ref(false)
  let rawProvider = $ref(null)
  let web3Provider = $ref(null)
  let signer = $ref(null)
  let isUserDataLoading = $ref(false)

  const doSwitchChain = async () => {
    if (isLoading)
      return
    isLoading = true
    error = ''

    rawProvider = await detectEthereumProvider()
    try {
      await rawProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      isShowChainSwitchModal = false
      isLoading = false
      addSuccess('Switch Chain Successed!')
      return true
    }
    catch (switchError) {
      switch (switchError.code.toString()) {
        case '4902':
          try {
            await rawProvider.request({
              method: 'wallet_addEthereumChain',
              params: [chainMap[chainId]],
            })
            return true
          }
          catch (err) {
            error = err.message
            return false
          }
        case '-32603':
          // Metamask bug: https://github.com/MetaMask/metamask-extension/issues/18509
          error = 'MetaMask Bug, please manually delete the target chain in metamask then come back to switch chain, see more https://github.com/MetaMask/metamask-extension/issues/18509'
          break
        default:
          error = switchError.message
      }
    }

    isLoading = false
    return false
  }

  const handleAccountsChanged = (newAccounts) => {
    const oldAccounts = getLsItem('accounts', [])
    // console.log('====> oldAccounts, newAccounts :', oldAccounts, newAccounts)
    // means user do not login yet, should notify user about login success
    if (oldAccounts.length === 0)
      addSuccess('Connect Success!')

    accounts = newAccounts
    setLsItem('accounts', newAccounts)
    // console.log('====> accounts :', accounts, newAccounts)
    // means user click on logout btn
    if (newAccounts.length === 0) {
      addSuccess('Disconnect Success!')
      // isShowLoginModal = true
      error = ''
    }
    else {
      // isShowLoginModal = false
    }
  }

  const doRequestAccounts = async () => {
    const provider = await detectEthereumProvider()
    try {
      const rz = await provider.request({ method: 'eth_requestAccounts' })
      handleAccountsChanged(rz)
    }
    catch (err) {
      error = err.message
      console.log('====> err :', err)
      return false
    }

    web3Provider = new ethers.providers.Web3Provider(provider)
    signer = web3Provider.getSigner()
    return provider
  }

  const doConnect = async () => {
    if (isLoading)
      return
    isLoading = true
    await doRequestAccounts()
    isLoading = false
    return true
  }

  const doDisconnect = async () => {
    handleAccountsChanged([])
  }

  const initWeb3 = async (isForce = false) => {
    onboarding = new MetaMaskOnboarding()
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (isForce)
        isShowOnboardModal = true

      return
    }

    let provider = ''
    try {
      provider = await detectEthereumProvider()
      if (!provider)
        return false

      web3Provider = new ethers.providers.Web3Provider(provider)
      signer = web3Provider.getSigner()
      provider.on('message', (msg) => {
        console.log('====> msg :', msg)
      })
      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', () => {
        isLoading = false
        if (provider.chainId !== chainId) {
          isShowLoginModal = false
          // isShowChainSwitchModal = true
        }
        else {
          isShowChainSwitchModal = false
          isShowLoginModal = true
        }
      })
    }
    catch (err) {
      console.log('====> err :', err)
      return false
    }

    if (provider.chainId !== chainId) {
      if (isForce)
        isShowChainSwitchModal = true

      // return
    }

    accounts = getLsItem('accounts', [])
    if (accounts.length === 0 && isForce)
      isShowLoginModal = true
  }

  const initWeb3Force = async () => {
    return initWeb3(true)
  }

  const initContract = async (contractName, isWrite = false, contractAddress = '') => {
    if (!contractAddress)
      contractAddress = getContractAddress(contractName)

    const contractAbi = CHAIN_CONTRACT_ABI_MAP[contractName]
    if (!contractAbi)
      throw new Error(`abi not found for ${contractName}`)

    let provider = ''
    try {
      rawProvider = await detectEthereumProvider()
      provider = new ethers.providers.Web3Provider(rawProvider)
    }
    catch (err) {
      isShowOnboardModal = true // TODO: fix detectEthereumProvider bug
      return false
    }

    // console.log('====> contractAddress :', contractAddress)
    if (!isWrite)
      return new ethers.Contract(contractAddress, contractAbi, provider)

    if (!walletAddress) {
      await initWeb3(true)
      return
    }

    if (!walletAddress)
      throw new Error('user do not login yet')

    const signer = provider.getSigner()

    return new ethers.Contract(contractAddress, contractAbi, signer)
  }

  const contractRead = async (contractName, methodName, ...params) => {
    const contract = await initContract(contractName)
    if (!contract[methodName])
      return []

    let rz = ''
    if (params.length > 0)
      rz = await contract[methodName](...params)

    else
      rz = await contract[methodName]()

    return rz
  }

  const contractWrite = async (contractName, methodName, ...params) => {
    const contract = await initContract(contractName, true)
    if (!contract[methodName])
      return []

    let rz = ''
    if (params.length > 0)
      rz = await contract[methodName](...params)

    else
      rz = await contract[methodName]()

    return rz
  }

  const bpAction = async (methodName, ...params) => {
    const loadingItem = addLoading('Start submitting to the blockchain')
    const tx = await contractWrite('BuidlerProtocol', methodName, ...params)
    const rc = await tx.wait()
    addSuccess('Submit to the blockchain successed!', loadingItem)
    return rc
  }

  const contractReadWithAddress = async (contractName, contractAddress, methodName, ...params) => {
    const contract = await initContract(contractName, false, contractAddress)
    let rz = ''
    if (params.length > 0)
      rz = await contract[methodName](...params)

    else
      rz = await contract[methodName]()

    return rz
  }

  const removeWeb3EventListener = async () => {
    const provider = await detectEthereumProvider()
    if (!provider)
      return

    if (provider.off)
      provider.off('accountsChanged', handleAccountsChanged)
  }

  const getTxUrl = (hash) => {
    const prefixUrl = chainMap[chainId].blockExplorerUrls
    return `${prefixUrl}tx/${hash}`
  }

  const queryProfile = async () => {
    isUserDataLoading = true
    const contractReader = await initContract('BuidlerProtocol', false)
    const profileCid = await contractReader.getBuidler(walletAddress)
    if (profileCid) {
      userData = await getJson(profileCid)
    }
    else {
      userData = {
        walletAddress,
      }
    }
    isUserDataLoading = false
  }
  const queryBalance = async () => {
    rawProvider = await detectEthereumProvider()
    const provider = new ethers.providers.Web3Provider(rawProvider)
    userBalanceRaw = await provider.getBalance(walletAddress)
  }

  const isMyWalletAddress = (address) => {
    return isSameAddress(walletAddress, address)
  }

  watchEffect(() => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled())
      return
    if (accounts.length > 0) {
      //  process.env.NODE_ENV !== 'development' &&
      doIdentify(`id_${accounts[0]}`)
      onboarding?.stopOnboarding()
    }
  })

  watchEffect(async () => {
    if (!walletAddress)
      return
    // await queryProfile()
    // await queryBalance()
  })

  return $$({
    error,
    rawProvider,
    inviter,
    userData,
    userBalance,
    isLoading,
    appaddress,
    chainId,
    chain,
    isShowOnboardModal,
    isShowChainSwitchModal,
    isShowLoginModal,
    web3Provider,
    signer,
    walletAddress,
    ethers,
    isUserDataLoading,
    parseEther,
    formatUnits,
    initWeb3,
    initWeb3Force,
    getContractAddress,
    removeWeb3EventListener,
    doSwitchChain,
    initContract,
    getTxUrl,
    queryProfile,
    getJson,
    storeJson,
    storeJsonWithStatus,
    addLoading,
    addSuccess,
    addError,
    addWarning,
    alertError,
    alertSuccess,
    contractRead,
    contractWrite,
    bpAction,
    isMyWalletAddress,
    contractReadWithAddress,
    doOnboard,
    doConnect,
    doDisconnect,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(web3AuthStore, import.meta.hot))
