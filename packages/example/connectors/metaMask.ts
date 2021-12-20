import { initializeConnector } from '@wwwr/core';
import { MetaMask } from '@wwwr/metamask';

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions),
);
