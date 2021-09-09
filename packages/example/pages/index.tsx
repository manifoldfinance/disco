import dynamic from 'next/dynamic'
import { UseStore } from 'zustand'
import { Connector, Web3ReactState } from '@web3-react/types'
import { connectors } from '../connectors'

function Status({
  connector,
  useConnector,
}: {
  connector: InstanceType<typeof Connector>
  useConnector: UseStore<Web3ReactState>
}) {
  const chainId = useConnector((state) => state.chainId)
  const accounts = useConnector((state) => state.accounts)
  const error = useConnector((state) => state.error)

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      <b>{connector.constructor.name}</b>
      <br />
      {error ? (
        <>
          🛑 {error.name}: {error.message}
        </>
      ) : connected ? (
        <>✅ Connected</>
      ) : (
        <>⚠️ Disconnected</>
      )}
    </div>
  )
}

function ChainId({ useConnector }: { useConnector: UseStore<Web3ReactState> }) {
  const chainId = useConnector((state) => state.chainId)

  return <div>Chain Id: {chainId ? <b>{chainId}</b> : '-'}</div>
}

function Accounts({ useConnector }: { useConnector: UseStore<Web3ReactState> }) {
  const accounts = useConnector((state) => state.accounts)

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

function Connect({ connector, useConnector }: { connector: Connector; useConnector: UseStore<Web3ReactState> }) {
  const activating = useConnector((state) => state.activating)
  const error = useConnector((state) => state.error)

  const chainId = useConnector((state) => state.chainId)
  const accounts = useConnector((state) => state.accounts)
  const connected = Boolean(chainId && accounts)

  return (
    <button
      onClick={() => {
        if (connected) {
          if (connector?.deactivate) {
            connector.deactivate()
          }
        } else {
          connector.activate()
        }
      }}
      disabled={connected ? (connector.deactivate ? false : true) : false}
    >
      {error
        ? 'Try Again?'
        : connected
        ? connector.deactivate
          ? 'Disconnect'
          : 'Connected'
        : activating
        ? 'Connecting...'
        : 'Activate'}
    </button>
  )
}

function App() {
  return (
    <div style={{ display: 'flex' }}>
      {connectors.map(([connector, useConnector]) => (
        <div style={{ minWidth: '25rem', padding: '1rem', margin: '1rem', border: '1px solid' }}>
          <Status connector={connector} useConnector={useConnector} />
          <br />
          <ChainId useConnector={useConnector} />
          <Accounts useConnector={useConnector} />
          <br />
          <Connect connector={connector} useConnector={useConnector} />
        </div>
      ))}
    </div>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })
