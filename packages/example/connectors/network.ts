import { initializeConnector } from '@web3-react/core'
import { Network } from '@web3-react/network'

const urls = [
  process.env.infuraKey ? `https://mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
  process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
].filter((url) => url)

export const [network, useNetwork] = initializeConnector<Network>(Network, [urls])
