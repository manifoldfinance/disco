import { createWeb3ReactStoreAndActions } from '@web3-react/store'
import { MetaMask } from '@web3-react/metamask'
import create from 'zustand'

const [store, actions] = createWeb3ReactStoreAndActions()
export const metaMask = new MetaMask(actions)
export const useMetaMask = create(store)
