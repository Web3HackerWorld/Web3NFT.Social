export const appStore = defineStore('appStore', () => {
  const { contractRead, walletAddress, getContractAddress, contractReadWithAddress } = $(web3AuthStore())

  const allowanceModal = $ref({
    isShow: false,
    tokenContractName: '',
    appContractName: '',
    amount: '0',
    doClose: () => {},
  })
  let addTokenCost = $ref(parseEther('0'))
  const payTokenName = $ref('BuidlerStableToken')
  const payTokenAddress = $ref('')
  const appContractName = $ref('BuidlerProtocol')
  let balanceBSTSwap = $ref(0)
  let balanceBSTEntropy = $ref(0)
  const queryBstBalance = async () => {
    const rz = await Promise.all([
      contractRead('BSTSwap', 'balanceOf', walletAddress),
      contractRead('BSTEntropy', 'balanceOf', walletAddress),
    ])
    balanceBSTSwap = rz[0]
    balanceBSTEntropy = rz[1]
  }

  let currentAllowance = $ref(0)
  const queryAllowance = async () => {
    const appContractAddress = getContractAddress(appContractName)
    currentAllowance = await contractReadWithAddress(payTokenName, payTokenAddress, 'allowance', walletAddress, appContractAddress)
  }

  const showAllowanceModal = (params) => {
    const { amount, doClose, tokenContractName } = params
    allowanceModal.isShow = true
    allowanceModal.tokenContractName = tokenContractName || payTokenName
    allowanceModal.appContractName = params.appContractName || appContractName
    allowanceModal.amount = amount
    allowanceModal.doClose = doClose
  }

  let platformCommission = $ref('')
  const mobileMenuOpen = $ref(false)

  const getAppConfig = async () => {
    const rz = await contractRead('BuidlerProtocol', 'getAppConfig')
    addTokenCost = rz.addTokenCost
    platformCommission = rz.platformCommission
  }

  onMounted(async () => {
    await getAppConfig()
  })
  watchEffect(async () => {
    if (!walletAddress)
      return
    await getAppConfig()
    await Promise.all([queryBstBalance(), queryAllowance()])
  })

  return $$({
    currentAllowance,
    allowanceModal,
    addTokenCost,
    payTokenName,
    payTokenAddress,
    appContractName,
    platformCommission,
    balanceBSTSwap,
    balanceBSTEntropy,
    mobileMenuOpen,
    queryAllowance,
    showAllowanceModal,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
