import { Connector, Actions, Provider } from '@web3-react/types'

export class NoMetaMaskError extends Error {
  public constructor() {
    super('MetaMask not installed')
    Object.setPrototypeOf(this, NoMetaMaskError.prototype)
  }
}

function parseChainId(chainId: string) {
  return Number.parseInt(chainId, 16)
}

export class MetaMask extends Connector {
  private providerPromise: Promise<void>
  public provider: undefined | Provider | null

  constructor(actions: Actions) {
    super(actions)

    this.providerPromise = this.startListening()
  }

  private async startListening(): Promise<void> {
    const detectEthereumProvider = await import('@metamask/detect-provider').then((m) => m?.default ?? m)

    return (detectEthereumProvider() as Promise<Provider | null>).then((provider) => {
      this.provider = provider

      if (this.provider) {
        // handle connect
        this.provider.on('connect', ({ chainId }: { chainId: string }): void => {
          this.actions.update({ chainId: parseChainId(chainId) })
        })

        // handle disconnect
        this.provider.on('disconnect', (error: Error): void => {
          this.actions.reportError(error)
        })

        // handle chainChanged
        this.provider.on('chainChanged', (chainId: string): void => {
          this.actions.update({ chainId: parseChainId(chainId) })
        })

        // handle accountsChanged
        this.provider.on('accountsChanged', (accounts: string[]): void => {
          this.actions.update({ accounts })
        })

        // silently attempt to eagerly connect
        Promise.all([
          this.provider.request({ method: 'eth_chainId' }) as Promise<string>,
          this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
        ])
          .then(([chainId, accounts]) => {
            if (accounts.length > 0) {
              this.actions.update({ chainId: parseChainId(chainId), accounts })
            }
          })
          .catch(() => {
            console.debug('Could not connect eagerly')
          })
      }
    })
  }

  public async activate(): Promise<void> {
    this.actions.startActivation()

    await this.providerPromise

    if (this.provider) {
      const [chainId, accounts] = await Promise.all([
        this.provider.request({ method: 'eth_chainId' }) as Promise<string>,
        this.provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      ])

      this.actions.update({ chainId: Number.parseInt(chainId, 16), accounts })
    } else {
      this.actions.reportError(new NoMetaMaskError())
    }
  }
}
