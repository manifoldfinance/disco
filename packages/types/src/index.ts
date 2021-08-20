import { State, StoreApi } from 'zustand/vanilla'

export interface Web3ReactState extends State {
  chainId?: number
  accounts?: string[]
  activating: boolean
  error: Error | null
}

export type Web3ReactStore = StoreApi<Web3ReactState>

export interface Actions {
  startActivation: () => void
  update: (state: Pick<Web3ReactState, 'chainId' | 'accounts'>) => void
  reportError: (error: Error) => void
}

export abstract class Connector {
  protected actions: Actions

  constructor(actions: Actions) {
    this.actions = actions
  }

  public abstract activate(): Promise<void>
}
