import { initializeConnector } from '@wwwr/core';
import { WalletConnect } from '@wwwr/walletconnect';
import { URLS } from './network';

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce((accumulator, chainId) => {
        accumulator[chainId] = URLS[chainId][0];
        return accumulator;
      }, {}),
    }),
  Object.keys(URLS).map((chainId) => Number(chainId)),
);
