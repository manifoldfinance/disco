import { createWeb3ReactStoreAndActions } from '@web3-react/store'
import { MetaMask } from '@web3-react/metamask'
import create from 'zustand'

const [store, actions] = createWeb3ReactStoreAndActions()
const metaMask = new MetaMask(actions)
const useMetamask = create(store)

function Status() {
  const chainId = useMetamask((state) => state.chainId)
  const accounts = useMetamask((state) => state.accounts)
  const error = useMetamask((state) => state.error)

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      {error ? (
        <>
          {error.name}: {error.message}
        </>
      ) : connected ? (
        <>
          Connected via <b>{metaMask.constructor.name}</b>
        </>
      ) : (
        'Disconnected'
      )}
    </div>
  )
}

function ChainId() {
  const chainId = useMetamask((state) => state.chainId)

  return <div>Chain Id: {chainId ? <b>{chainId}</b> : '-'}</div>
}

function Accounts() {
  const accounts = useMetamask((state) => state.accounts)

  return (
    <div>
      Accounts:
      {accounts === undefined ? (
        <ul style={{ margin: 0 }}>-</ul>
      ) : accounts.length === 0 ? (
        <ul style={{ margin: 0 }}>None</ul>
      ) : (
        accounts?.map((account) => (
          <ul key={account} style={{ margin: 0 }}>
            <b>{account}</b>
          </ul>
        ))
      )}
    </div>
  )
}

function HomePage() {
  const chainId = useMetamask((state) => state.chainId)
  const accounts = useMetamask((state) => state.accounts)
  const activating = useMetamask((state) => state.activating)
  const error = useMetamask((state) => state.error)

  const connected = Boolean(chainId && accounts)

  return (
    <>
      <Status />
      <ChainId />
      <Accounts />

      <button
        onClick={() => {
          metaMask.activate()
        }}
        disabled={connected}
      >
        {error ? 'Try Again?' : connected ? 'Connected' : activating ? 'Connecting...' : 'Activate MetaMask'}
      </button>
    </>
  )
}

export default HomePage
