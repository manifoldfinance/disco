import { EventEmitter } from 'events'
import { Actions, Connector } from '@web3-react/types'
import detectEthereumProvider from '@metamask/detect-provider'

interface Ethereum extends EventEmitter {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>
}

export class NoMetaMaskError extends Error {
  public constructor() {
    super('MetaMask not installed.')
    Object.setPrototypeOf(this, NoMetaMaskError.prototype)
  }
}

export class MetaMask extends Connector {
  protected provider: Promise<Ethereum | null>
  public ethereum: undefined | Ethereum | null

  constructor(actions: Actions) {
    super(actions)

    this.provider = this.startListening()
  }

  private startListening(): Promise<Ethereum | null> {
    return (detectEthereumProvider() as Promise<Ethereum | null>).then((provider) => {
      this.ethereum = provider

      if (provider) {
        // handle connect
        provider.on('connect', ({ chainId }: { chainId: string }): void => {
          this.actions.update({ chainId: Number.parseInt(chainId, 16) })
        })

        // handle disconnect
        provider.on('disconnect', (error: Error): void => {
          this.actions.reportError(error)
        })

        // handle chainChanged
        provider.on('chainChanged', (chainId: string): void => {
          this.actions.update({ chainId: Number.parseInt(chainId, 16) })
        })

        // handle accountsChanged
        provider.on('accountsChanged', (accounts: string[]): void => {
          this.actions.update({ accounts })
        })

        // silently attempt to eagerly connect
        Promise.all([
          provider.request({ method: 'eth_chainId' }) as Promise<string>,
          provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
        ])
          .then(([chainId, accounts]) => {
            if (accounts.length > 0) {
              this.actions.update({ chainId: Number.parseInt(chainId, 16), accounts })
            }
          })
          .catch()
      }

      return provider
    })
  }

  public async activate(): Promise<void> {
    this.actions.startActivation()

    const provider = await this.provider

    if (provider) {
      const [chainId, accounts] = await Promise.all([
        provider.request({ method: 'eth_chainId' }) as Promise<string>,
        provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      ])

      this.actions.update({ chainId: Number.parseInt(chainId, 16), accounts })
    } else {
      this.actions.reportError(new NoMetaMaskError())
    }
  }
}
