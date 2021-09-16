import { createWeb3ReactStoreAndActions } from '@web3-react/store'
import { Actions, Connector, Web3ReactState } from '@web3-react/types'
import create, { UseStore } from 'zustand'

// https://stackoverflow.com/questions/24677592/generic-type-inference-with-class-argument/26696435#26696435
interface IConstructor<T> {
  new (...args: any[]): T
}

export function initializeConnector<T extends Connector>(
  Connector: IConstructor<T>,
  constructorArgs: any = [] // TODO: really unfortunate that we can't type this
): [T, UseStore<Web3ReactState>] {
  const [store, actions] = createWeb3ReactStoreAndActions()

  const instance = new Connector(actions, ...constructorArgs)
  const useConnector = create<Web3ReactState>(store)

  return [instance, useConnector]
}
