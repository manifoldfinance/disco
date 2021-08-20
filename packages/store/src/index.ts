import create from 'zustand/vanilla'
import { Web3ReactState, Web3ReactStore, Actions, Connector } from '@web3-react/types'

function validateChainId(chainId: number, allowedChainIds: number[]): Error | null {
  return allowedChainIds.some((allowedChainId) => chainId === allowedChainId)
    ? null
    : Error(`ChainId ${chainId} is not included in ${allowedChainIds}`)
}

function validateAccount(account: string): void {
  if (!account.match(/^0x[0-9a-fA-F]{40}$/)) {
    throw Error(`Account ${account} has an invalid encoding`)
  }

  // this check can (but is statistically unlikely to) throw a false positive, and does not catch invalid checksums
  if (account.match(/^0x[0-9a-f]{40}$/) || account.match(/^0x[0-9A-F]{40}$/)) {
    console.warn(`Account ${account} may not be checksummed`)
  }
}

export function createWeb3ReactStoreAndActions(allowedChainIds?: number[]): [Web3ReactStore, Actions] {
  const store = create<Web3ReactState>(() => ({
    activating: false,
    error: null,
  }))

  function startActivation() {
    store.setState({ activating: true })
  }

  function update(state: Pick<Web3ReactState, 'chainId' | 'accounts'>) {
    // validate accounts statically, independent of existing state
    if (state.accounts !== undefined) {
      state.accounts.forEach(validateAccount)
    }

    store.setState((existingState) => {
      let error: Error | null = null

      // if we have a chainId allowlist, we need to run validation
      if (allowedChainIds !== undefined) {
        if (state.chainId !== undefined) {
          // if we've been given a chainId, validate against it
          error = validateChainId(state.chainId, allowedChainIds)
        } else if (existingState.chainId !== undefined) {
          // if not, but we have a chainId in state already, validate against _it_
          error = validateChainId(existingState.chainId, allowedChainIds)
        }
      }

      if (existingState.error !== undefined && error !== null) {
        console.warn(`Existing error ${existingState.error} is being clobbered by ${error}`)
      }

      // ensure that the activating flag is cleared when fully activated
      let activating = existingState.activating
      if (existingState.activating) {
        if (
          (state.chainId !== undefined || existingState.chainId !== undefined) &&
          (state.accounts !== undefined || existingState.accounts !== undefined)
        ) {
          activating = false
        }
      }

      // if error is not defined already, set it to the existing error (if any)
      if (error === null) {
        error = existingState.error
        if (error !== null) {
          // if we're here, the heuristic used to clear the error is if chainId is being updated
          // note that this is fairly arbitrary, and we could do more here
          if (state.chainId !== undefined) {
            error = null
          }
        }
      }

      return { ...state, activating, error }
    })
  }

  function reportError(error: Error) {
    store.setState((existingState) => ({ error, activating: existingState.activating }))
  }

  return [store, { startActivation, update, reportError }]
}

type Constructor<T> = new (...args: any[]) => T
