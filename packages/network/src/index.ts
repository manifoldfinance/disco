import { Connector, Actions, Provider } from '@web3-react/types'

type url =
  | string
  | {
      url: string
      headers?: { [key: string]: string | number }

      user?: string
      password?: string

      allowInsecureAuthentication?: boolean
      allowGzip?: boolean

      throttleLimit?: number
      throttleSlotInterval?: number
      throttleCallback?: (attempt: number, url: string) => Promise<boolean>

      timeout?: number
    }

type Networkish =
  | number
  | string
  | {
      name: string
      chainId: number
      ensAddress?: string
      _defaultProvider?: (providers: any, options?: any) => any
    }

interface FallbackProviderConfig {
  provider: Provider
  priority?: number
  stallTimeout?: number
  weight?: number
}

export class Network extends Connector {
  public provider: Provider | undefined

  private readonly instantiateProvider: () => Promise<void>

  constructor(
    actions: Actions,
    urls: url | url[],
    network?: Networkish,
    fallbackProviderConfigs?: Omit<FallbackProviderConfig, 'provider'>[],
    quorum?: number
  ) {
    super(actions)

    if (!Array.isArray(urls)) {
      if (fallbackProviderConfigs) {
        throw new Error('fallbackProviderConfigs defined with a single url')
      }
      if (quorum) {
        throw new Error('quorum defined with a single url')
      }
      urls = [urls]
    } else {
      if (fallbackProviderConfigs && fallbackProviderConfigs.length !== urls.length) {
        throw new Error('fallbackProviderConfigs length does not match urls length')
      }
    }

    this.instantiateProvider = async () => {
      const { JsonRpcProvider, FallbackProvider } = await import('@ethersproject/providers').then(
        (m) => m?.default ?? m
      )
      const { Eip1193Bridge } = await import('@ethersproject/experimental').then((m) => m?.default ?? m)

      const providers = (urls as url[]).map((url) => new JsonRpcProvider(url, network))

      this.provider = new Eip1193Bridge(
        // TODO: use VoidSigner here?
        providers[0].getSigner(),
        providers.length === 1
          ? providers[0]
          : new FallbackProvider(
              fallbackProviderConfigs
                ? fallbackProviderConfigs.map((config, i) => ({ ...config, provider: providers[i] }))
                : providers,
              quorum
            )
      )
    }
  }

  public async activate(): Promise<void> {
    this.actions.startActivation()

    await this.instantiateProvider()
    // this.provider guaranteed to be defined once we're here
    const chainId = await ((this.provider as Provider).request({ method: 'eth_chainId' }) as Promise<number>)

    this.actions.update({ chainId, accounts: [] })
  }
}
