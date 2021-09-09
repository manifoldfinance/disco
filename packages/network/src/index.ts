import { Connector, Actions, Provider } from '@web3-react/types'
import { Eip1193Bridge } from '@ethersproject/experimental'
import { JsonRpcProvider } from '@ethersproject/providers'

export class Network extends Connector {
  public provider: Provider

  constructor(actions: Actions, ...rest: ConstructorParameters<typeof JsonRpcProvider>) {
    super(actions)
    const ethersProvider = new JsonRpcProvider(...rest)
    this.provider = new Eip1193Bridge(ethersProvider.getSigner(), ethersProvider)
  }

  public async activate(): Promise<void> {
    this.actions.startActivation()

    const chainId = await (this.provider.request({ method: 'eth_chainId' }) as Promise<number>)

    this.actions.update({ chainId, accounts: [] })
  }
}
