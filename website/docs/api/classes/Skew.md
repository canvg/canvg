---
id: "Skew"
title: "Class: Skew"
sidebar_label: "Skew"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Matrix`](Matrix.md)

  ↳ **`Skew`**

  ↳↳ [`SkewX`](SkewX.md)

  ↳↳ [`SkewY`](SkewY.md)

## Properties

### matrix

• `Protected` **matrix**: [`MatrixValue`](../#matrixvalue)

#### Inherited from

[Matrix](Matrix.md).[matrix](Matrix.md#matrix)

#### Defined in

[src/Transform/Matrix.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L10)

___

### type

• **type**: `string` = `'skew'`

#### Overrides

[Matrix](Matrix.md).[type](Matrix.md#type)

#### Defined in

[src/Transform/Skew.ts:6](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Skew.ts#L6)

___

### angle

• `Protected` `Readonly` **angle**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Skew.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Skew.ts#L7)

## Methods

### apply

▸ **apply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[Matrix](Matrix.md).[apply](Matrix.md#apply)

#### Defined in

[src/Transform/Matrix.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L24)

___

### unapply

▸ **unapply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[Matrix](Matrix.md).[unapply](Matrix.md#unapply)

#### Defined in

[src/Transform/Matrix.ts:45](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L45)

___

### applyToPoint

▸ **applyToPoint**(`point`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |

#### Returns

`void`

#### Inherited from

[Matrix](Matrix.md).[applyToPoint](Matrix.md#applytopoint)

#### Defined in

[src/Transform/Matrix.ts:76](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L76)

## Constructors

### constructor

• **new Skew**(`document`, `skew`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `skew` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Overrides

[Matrix](Matrix.md).[constructor](Matrix.md#constructor)

#### Defined in

[src/Transform/Skew.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Skew.ts#L9)
