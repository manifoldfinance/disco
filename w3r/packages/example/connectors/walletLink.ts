import { initializeConnector } from '@wwwr/core';
import { WalletLink } from '@wwwr/walletlink';
import { URLS } from './network';

export const [walletLink, hooks] = initializeConnector<WalletLink>(
  (actions) =>
    new WalletLink(actions, {
      url: URLS[1][0],
      appName: 'web3-react',
    }),
  [1],
);
