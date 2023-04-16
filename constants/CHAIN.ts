import chainMap from './chainMap.json'
import contractAddressMap from './contractAddressMap.json'

const allABIJsons = import.meta.globEager('./abis/*.json')
const allABIs = {}
useMap(allABIJsons, (val, key) => {
  key = key.replace('./abis/', '').replace('.json', '')
  allABIs[key] = val.default
})

export const CONTRACT_ADDRESS_MAP = contractAddressMap

const chainNameMap = {
  '0x5': 'goerli',
  '0x13881': 'mumbai',
  '0x7a69': 'hardhat',
  '0xc45': 'hyperspace',
  '0x61': 'bscTestnet',
  '0x507': 'moonbaseAlpha',
  '0x1389': 'mantleTestnet',
}

export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID
export const CHAIN_MAP = chainMap
export const CHAIN_NAME = chainNameMap[CHAIN_ID]

const BuidlerProtocol = [
  ...allABIs.ERC1155,
  ...allABIs.Token,
  ...allABIs.Item,
  ...allABIs.Meta,
  ...allABIs.Buidler,
  ...allABIs.App,
  ...allABIs.Market,
  ...allABIs.DataDAO,
]

export const CHAIN_CONTRACT_ABI_MAP = {
  ...allABIs,
  BuidlerProtocol,
}
