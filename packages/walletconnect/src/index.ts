import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'
import { Actions, Connector, Provider } from '@web3-react/types'
import EventEmitter from 'events'

interface MockWalletConnectProvider
  extends Omit<WalletConnectProvider, 'on' | 'off' | 'once' | 'removeListener'>,
    EventEmitter {}

export class WalletConnect extends Connector {
  private providerPromise: Promise<void>

  public provider: undefined | MockWalletConnectProvider

  constructor(actions: Actions, options: IWCEthRpcConnectionOptions) {
    super(actions)

    this.providerPromise = this.startListening(options)
  }

  private async startListening(options: IWCEthRpcConnectionOptions): Promise<void> {
    const WalletConnectProvider = await import('@walletconnect/ethereum-provider').then((m) => m?.default ?? m)

    this.provider = new WalletConnectProvider(options) as unknown as MockWalletConnectProvider

    // handle disconnect
    this.provider.on('disconnect', (error: Error): void => {
      this.actions.reportError(error)
    })

    // handle chainChanged
    this.provider.on('chainChanged', (chainId: number): void => {
      this.actions.update({ chainId })
    })

    // handle accountsChanged
    this.provider.on('accountsChanged', (accounts: string[]): void => {
      this.actions.update({ accounts })
    })

    // silently attempt to eagerly connect
    Promise.all([
      this.provider.request({ method: 'eth_chainId' }) as Promise<number>,
      this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
    ])
      .then(([chainId, accounts]) => {
        if (accounts.length > 0) {
          this.actions.update({ chainId, accounts })
        }
      })
      .catch((error) => {
        console.debug('Could not connect eagerly', error)
      })
  }

  public async activate(): Promise<void> {
    this.actions.startActivation()

    await this.providerPromise
    // this.provider guaranteed to be defined now

    await Promise.all([
      (this.provider as Provider).request({ method: 'eth_chainId' }) as Promise<number>,
      (this.provider as Provider).request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
    ])
      .then(([chainId, accounts]) => {
        this.actions.update({ chainId, accounts })
      })
      .catch((error) => {
        this.actions.reportError(error)
      })
  }

  public async deactivate(): Promise<void> {
    if (this.provider) {
      await this.provider.disconnect()
    }
  }
}
