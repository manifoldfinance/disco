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

| Name      | Type                                  |
| :-------- | :------------------------------------ |
| `actions` | [`Actions`](../interfaces/Actions.md) |

#### Defined in

[src/index.ts:41](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L41)

## Properties

### actions

• `Protected` `Readonly` **actions**: [`Actions`](../interfaces/Actions.md)

#### Defined in

[src/index.ts:39](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L39)

---

### provider

• **provider**: `undefined` \| [`Provider`](../interfaces/Provider.md)

#### Defined in

[src/index.ts:37](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L37)

## Methods

### activate

▸ `Abstract` **activate**(...`args`): `void` \| `Promise`<`void`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/index.ts:45](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L45)

---

### deactivate

▸ `Optional` **deactivate**(...`args`): `void` \| `Promise`<`void`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/index.ts:46](https://github.com/sambacha/w3r/blob/ec0b730/packages/types/src/index.ts#L46)
