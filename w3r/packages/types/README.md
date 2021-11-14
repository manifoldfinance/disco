[@wwwr/types](README.md) / Exports

# @wwwr/types

## Table of contents

### Classes

- [Connector](classes/Connector.md)

### Interfaces

- [Actions](interfaces/Actions.md)
- [Provider](interfaces/Provider.md)
- [RequestArguments](interfaces/RequestArguments.md)
- [Web3ReactState](interfaces/Web3ReactState.md)
- [Web3ReactStateUpdate](interfaces/Web3ReactStateUpdate.md)

### Type aliases

- [Web3ReactStore](modules.md#web3reactstore)

## Type aliases

### Web3ReactStore

Ƭ **Web3ReactStore**: `StoreApi`<[`Web3ReactState`](interfaces/Web3ReactState.md)\>

#### Defined in

[src/index.ts:11](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L11)
[@wwwr/types](../README.md) / [Exports](../modules.md) / Connector

# Class: Connector

## Table of contents

### Constructors

- [constructor](Connector.md#constructor)

### Properties

- [actions](Connector.md#actions)
- [provider](Connector.md#provider)

### Methods

- [activate](Connector.md#activate)
- [deactivate](Connector.md#deactivate)

## Constructors

### constructor

• **new Connector**(`actions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`Actions`](../interfaces/Actions.md) |

#### Defined in

[src/index.ts:41](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L41)

## Properties

### actions

• `Protected` `Readonly` **actions**: [`Actions`](../interfaces/Actions.md)

#### Defined in

[src/index.ts:39](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L39)

___

### provider

• **provider**: `undefined` \| [`Provider`](../interfaces/Provider.md)

#### Defined in

[src/index.ts:37](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L37)

## Methods

### activate

▸ `Abstract` **activate**(...`args`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/index.ts:45](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L45)

___

### deactivate

▸ `Optional` **deactivate**(...`args`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/index.ts:46](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L46)
[@wwwr/types](../README.md) / [Exports](../modules.md) / Actions

# Interface: Actions

## Table of contents

### Methods

- [reportError](Actions.md#reporterror)
- [reset](Actions.md#reset)
- [startActivation](Actions.md#startactivation)
- [update](Actions.md#update)

## Methods

### reportError

▸ **reportError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`void`

#### Defined in

[src/index.ts:21](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L21)

___

### reset

▸ **reset**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:22](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L22)

___

### startActivation

▸ **startActivation**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:19](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L19)

___

### update

▸ **update**(`stateUpdate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateUpdate` | [`Web3ReactStateUpdate`](Web3ReactStateUpdate.md) |

#### Returns

`void`

#### Defined in

[src/index.ts:20](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L20)
[@wwwr/types](../README.md) / [Exports](../modules.md) / Provider

# Interface: Provider

## Hierarchy

- `EventEmitter`

  ↳ **`Provider`**

## Table of contents

### Methods

- [addListener](Provider.md#addlistener)
- [emit](Provider.md#emit)
- [eventNames](Provider.md#eventnames)
- [getMaxListeners](Provider.md#getmaxlisteners)
- [listenerCount](Provider.md#listenercount)
- [listeners](Provider.md#listeners)
- [off](Provider.md#off)
- [on](Provider.md#on)
- [once](Provider.md#once)
- [prependListener](Provider.md#prependlistener)
- [prependOnceListener](Provider.md#prependoncelistener)
- [rawListeners](Provider.md#rawlisteners)
- [removeAllListeners](Provider.md#removealllisteners)
- [removeListener](Provider.md#removelistener)
- [request](Provider.md#request)
- [setMaxListeners](Provider.md#setmaxlisteners)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Provider`](Provider.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to {@link defaultMaxListeners}.

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Provider`](Provider.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`Provider`](Provider.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`Provider`](Provider.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Provider`](Provider.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Provider`](Provider.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Provider`](Provider.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Provider`](Provider.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### request

▸ **request**(`args`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`RequestArguments`](RequestArguments.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/index.ts:33](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L33)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Provider`](Provider.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465
[@wwwr/types](../README.md) / [Exports](../modules.md) / Web3ReactState

# Interface: Web3ReactState

## Hierarchy

- `State`

  ↳ **`Web3ReactState`**

## Table of contents

### Properties

- [accounts](Web3ReactState.md#accounts)
- [activating](Web3ReactState.md#activating)
- [chainId](Web3ReactState.md#chainid)
- [error](Web3ReactState.md#error)

## Properties

### accounts

• **accounts**: `undefined` \| `string`[]

#### Defined in

[src/index.ts:6](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L6)

___

### activating

• **activating**: `boolean`

#### Defined in

[src/index.ts:7](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L7)

___

### chainId

• **chainId**: `undefined` \| `number`

#### Defined in

[src/index.ts:5](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L5)

___

### error

• **error**: `undefined` \| `Error`

#### Defined in

[src/index.ts:8](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L8)
[@wwwr/types](../README.md) / [Exports](../modules.md) / Web3ReactStateUpdate

# Interface: Web3ReactStateUpdate

## Table of contents

### Properties

- [accounts](Web3ReactStateUpdate.md#accounts)
- [chainId](Web3ReactStateUpdate.md#chainid)

## Properties

### accounts

• `Optional` **accounts**: `string`[]

#### Defined in

[src/index.ts:15](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L15)

___

### chainId

• `Optional` **chainId**: `number`

#### Defined in

[src/index.ts:14](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L14)
