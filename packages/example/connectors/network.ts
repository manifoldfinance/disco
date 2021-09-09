import { createWeb3ReactStoreAndActions } from '@web3-react/store'
import { Network } from '@web3-react/network'
import create from 'zustand'

const [store, actions] = createWeb3ReactStoreAndActions()
export const network = new Network(actions, 'https://mainnet.infura.io/v3/3c0b4dbc03d04d339600795d11f0e6bc')
export const useNetwork = create(store)
