declare global {
    /**
     * #ablativeProvider
     * @interface Window
     * @description Hook for Ablative Provider
     */
    interface Window {
      ethereum?: {
        send: unknown 
        isMetaMask?: true
        enable: () => Promise<string[]> 
        on?: (...args: any[]) => void
        removeListener?: (...args: any[]) => void
        autoRefreshOnNetworkChange?: boolean
      }
      web3?: Record<string, unknown>
    }
  }