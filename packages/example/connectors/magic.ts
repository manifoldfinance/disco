import { initializeConnector } from '@wwwr/core';
import { Magic } from '@wwwr/magic';

export const [magic, hooks] = initializeConnector<Magic>(
  (actions) =>
    new Magic(actions, {
      apiKey: process.env.magicKey,
    }),
);
