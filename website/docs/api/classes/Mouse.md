---
id: "Mouse"
title: "Class: Mouse"
sidebar_label: "Mouse"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### working

• `Private` **working**: `boolean` = `false`

#### Defined in

[src/Mouse.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L20)

___

### events

• `Private` **events**: [`IEvent`](../interfaces/IEvent.md)[] = `[]`

#### Defined in

[src/Mouse.ts:21](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L21)

___

### eventElements

• `Private` **eventElements**: [`Element`](Element.md)[] = `[]`

#### Defined in

[src/Mouse.ts:22](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L22)

## Constructors

### constructor

• **new Mouse**(`screen`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `screen` | [`Screen`](Screen.md) |

#### Defined in

[src/Mouse.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L24)

## Methods

### isWorking

▸ **isWorking**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Mouse.ts:31](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L31)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Defined in

[src/Mouse.ts:35](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L35)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/Mouse.ts:52](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L52)

___

### hasEvents

▸ **hasEvents**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Mouse.ts:64](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L64)

___

### runEvents

▸ **runEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Mouse.ts:68](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L68)

___

### checkPath

▸ **checkPath**(`element`, `ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Mouse.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L100)

___

### checkBoundingBox

▸ **checkBoundingBox**(`element`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Defined in

[src/Mouse.ts:118](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L118)

___

### mapXY

▸ `Private` **mapXY**(`x`, `y`): [`Point`](Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/Mouse.ts:135](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L135)

___

### onClick

▸ `Private` **onClick**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[src/Mouse.ts:160](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L160)

___

### onMouseMove

▸ `Private` **onMouseMove**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

#### Returns

`void`

#### Defined in

[src/Mouse.ts:181](https://github.com/canvg/canvg/blob/5c58ee8/src/Mouse.ts#L181)
