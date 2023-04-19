export const appStore = defineStore('appStore', () => {
  const { contractRead, walletAddress, getContractAddress } = $(web3AuthStore())

  const vendor = import.meta.env.VITE_VENDER

  const allowanceModal = $ref({
    isShow: false,
    tokenContractName: '',
    appContractName: '',
    amount: '0',
    doClose: () => {},
  })
  const payBy = $ref('$BSTSwap')
  const payTokenList = ['$BSTSwap', '$BSTEntropy']
  const payTokenName = $computed(() => payBy.replace('$', ''))
  const tokenDataMap = $ref({
    $BSTSwap: {
      address: getContractAddress('BSTSwap'),
      balance: '0',
      allowance: '0',
    },
    $BSTEntropy: {
      address: getContractAddress('BSTEntropy'),
      balance: '0',
      allowance: '0',
    },
  })
  const bstBalance = $computed(() => tokenDataMap[payBy].balance)
  const payTokenAddress = $computed(() => tokenDataMap[payBy].address)
  const currentAllowance = $computed(() => tokenDataMap[payBy].allowance)

  let addTokenCost = $ref(parseEther('0'))
  const queryBstBalance = async () => {
    const rz = await Promise.all([
      contractRead('BSTSwap', 'balanceOf', walletAddress),
      contractRead('BSTEntropy', 'balanceOf', walletAddress),
    ])
    tokenDataMap.$BSTSwap.balance = rz[0] || ''
    tokenDataMap.$BSTEntropy.balance = rz[1] || ''
  }

  const queryAllowance = async () => {
    const appContractAddress = getContractAddress('BuidlerProtocol')
    const rz = await Promise.all([
      contractRead('BSTSwap', 'allowance', walletAddress, appContractAddress),
      contractRead('BSTEntropy', 'allowance', walletAddress, appContractAddress),
    ])
    tokenDataMap.$BSTSwap.allowance = rz[0] || ''
    tokenDataMap.$BSTEntropy.allowance = rz[1] || ''
  }

  const showAllowanceModal = (params) => {
    const { amount, doClose, tokenContractName } = params
    allowanceModal.isShow = true
    allowanceModal.tokenContractName = tokenContractName || payTokenName
    allowanceModal.appContractName = params.appContractName || 'BuidlerProtocol'
    allowanceModal.amount = amount
    allowanceModal.doClose = doClose
  }

  let platformCommission = $ref('')

  const getAppConfig = async () => {
    const rz = await contractRead('BuidlerProtocol', 'getAppConfig')
    addTokenCost = rz.addTokenCost
    platformCommission = rz.platformCommission
  }

  watchEffect(async () => {
    await getAppConfig()

    if (!walletAddress)
      return

    await Promise.all([getAppConfig(), queryBstBalance(), queryAllowance()])
  })

  return $$({
    currentAllowance,
    allowanceModal,
    addTokenCost,
    payTokenName,
    payTokenAddress,
    platformCommission,
    bstBalance,
    payTokenList,
    payBy,
    vendor,
    queryAllowance,
    showAllowanceModal,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
