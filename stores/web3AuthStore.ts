import { ethers } from 'ethers'
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider'

const chainId = import.meta.env.VITE_CHAIN_ID
const chainMap = CHAIN_MAP
let onboarding: MetaMaskOnboarding = null

export const web3AuthStore = defineStore('web3AuthStore', () => {
  const { addSuccess, addWarning } = $(notificationStore())
  const { getJson, storeJson } = $(useNFTStorage())
  const { doIdentify } = $(useLogRocket())

  let error = $ref('')
  let isLoading = $ref(false)

  const doOnboard = async () => {
    onboarding.startOnboarding()
  }

  // new version
  let accounts = $ref([])
  let userBalanceRaw = $ref(0)
  const userBalance = $computed(() => formatUnits(userBalanceRaw))
  const walletAddress = $computed(() => {
    if (accounts[0]) 
      return ethers.utils.getAddress(accounts[0])
    
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
      return true
    }
    catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
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
      }
      error = switchError.message
    }

    isLoading = false
    return false
  }

  const handleAccountsChanged = (newAccounts) => {
    const oldAccounts = getLsItem('accounts', [])
    // console.log('====> oldAccounts, newAccounts :', oldAccounts, newAccounts)
    // means user do not login yet, should notify user about login success
    if (oldAccounts.length === 0)
      addSuccess('Login Success!')

    accounts = newAccounts
    setLsItem('accounts', newAccounts)
    console.log('====> accounts :', accounts, newAccounts)
    // means user click on logout btn
    if (newAccounts.length === 0) {
      addSuccess('Logout Success!')
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

  const doLogout = async () => {
    handleAccountsChanged([])
  }

  const getContractAddress = contractName => useGet(CHAIN_CONTRACT_MAP, `${contractName}.${CHAIN_ID}`)
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
      await initWeb3()
      return
      // const rz = await doConnect();
      // if (!rz) return;
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

  const contractReadWithAddress = async (contractName, contractAddress, methodName, ...params) => {
    const contract = await initContract(contractName, false, contractAddress)
    let rz = ''
    if (params.length > 0)
      rz = await contract[methodName](...params)

    else
      rz = await contract[methodName]()

    return rz
  }

  const doShowLogin = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      isShowOnboardModal = true
      return
    }

    isShowLoginModal = true
  }
  const initWeb3 = async () => {
    onboarding = new MetaMaskOnboarding()
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
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
          isShowChainSwitchModal = true
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
      isShowChainSwitchModal = true
      return
    }

    accounts = getLsItem('accounts', [])
    if (accounts.length === 0)
      isShowLoginModal = true
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
    await queryProfile()
    await queryBalance()
  })

  return $$({
    parseEther,
    formatUnits,
    initWeb3,
    getContractAddress,
    removeWeb3EventListener,
    doSwitchChain,
    initContract,
    getTxUrl,
    queryProfile,
    getJson,
    storeJson,
    addSuccess,
    addWarning,
    contractRead,
    isMyWalletAddress,
    contractReadWithAddress,
    error,
    rawProvider,
    userData,
    userBalance,
    isLoading,
    doOnboard,
    chainId,
    doConnect,
    doShowLogin,
    doLogout,
    isShowOnboardModal,
    isShowChainSwitchModal,
    isShowLoginModal,
    web3Provider,
    signer,
    walletAddress,
    ethers,
    isUserDataLoading,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(web3AuthStore, import.meta.hot))