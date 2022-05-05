---
id: "Point"
title: "Class: Point"
sidebar_label: "Point"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### parse

▸ `Static` **parse**(`point`, `defaultValue?`): [`Point`](Point.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `point` | `string` | `undefined` |
| `defaultValue` | `number` | `0` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/Point.ts:5](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L5)

___

### parseScale

▸ `Static` **parseScale**(`scale`, `defaultValue?`): [`Point`](Point.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `scale` | `string` | `undefined` |
| `defaultValue` | `number` | `1` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/Point.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L11)

___

### parsePath

▸ `Static` **parsePath**(`path`): [`Point`](Point.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`Point`](Point.md)[]

#### Defined in

[src/Point.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L17)

___

### angleTo

▸ **angleTo**(`point`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |

#### Returns

`number`

#### Defined in

[src/Point.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L34)

___

### applyTransform

▸ **applyTransform**(`transform`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | [`MatrixValue`](../#matrixvalue) |

#### Returns

`void`

#### Defined in

[src/Point.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L38)

## Constructors

### constructor

• **new Point**(`x`, `y`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/Point.ts:29](https://github.com/canvg/canvg/blob/5c58ee8/src/Point.ts#L29)

## Properties

### x

• **x**: `number`

___

### y

• **y**: `number`
