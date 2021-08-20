import { createWeb3ReactStoreAndActions } from '@web3-react/store'
import { MetaMask } from '@web3-react/metamask'
import create from 'zustand'

const [store, actions] = createWeb3ReactStoreAndActions()
const metaMask = new MetaMask(actions)
const useMetamask = create(store)

function HomePage() {
  const chainId = useMetamask((state) => state.chainId)
  const accounts = useMetamask((state) => state.accounts)
  const activating = useMetamask((state) => state.activating)
  const error = useMetamask((state) => state.error)

  const connected = typeof chainId === 'number' && accounts?.length > 0

  return (
    <>
      <div>
        Chain Id:
        <li>{chainId}</li>
      </div>
      <div>
        Accounts:
        {accounts?.map((account) => (
          <li key={account}>{account}</li>
        ))}
      </div>

      <button
        onClick={() => {
          metaMask.activate()
        }}
        disabled={connected}
      >
        {error ? 'Error - Try Again?' : connected ? 'Connected' : activating ? '...' : 'Activate MetaMask'}
      </button>

      <div>{error?.message}</div>
    </>
  )
}

export default HomePage
