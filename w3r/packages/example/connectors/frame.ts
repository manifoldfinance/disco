import { initializeConnector } from '@wwwr/core';
import { Frame } from '@wwwr/frame';

export const [frame, hooks] = initializeConnector<Frame>(
  (actions) => new Frame(actions, undefined, false),
);
