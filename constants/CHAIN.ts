import chainMap from './chainMap.json'
import chainConfigMap from './chainConfigMap.json'
import BuidlerStableToken from './abis/BuidlerStableToken.json'

import CCANSBT from './abis/CCANSBT.json'

// BuidlerProtocol
import ERC1155 from './abis/ERC1155.json'
import Token from './abis/Token.json'
import Item from './abis/Item.json'
import Meta from './abis/Meta.json'
import Buidler from './abis/Buidler.json'
import App from './abis/App.json'
import Market from './abis/Market.json'
import DataDAO from './abis/DataDAO.json'

export const CHAIN_CONTRACT_MAP = chainConfigMap

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
  ...ERC1155,
  ...Token,
  ...Item,
  ...Meta,
  ...Buidler,
  ...App,
  ...Market,
  ...DataDAO,
]

export const CHAIN_CONTRACT_ABI_MAP = {
  BuidlerProtocol,
  BuidlerStableToken,
  CCANSBT,
}
