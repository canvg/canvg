---
id: "SkewX"
title: "Class: SkewX"
sidebar_label: "SkewX"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Skew`](Skew.md)

  ↳ **`SkewX`**

## Properties

### matrix

• `Protected` **matrix**: [`MatrixValue`](../#matrixvalue)

#### Inherited from

[Skew](Skew.md).[matrix](Skew.md#matrix)

#### Defined in

[src/Transform/Matrix.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L10)

___

### angle

• `Protected` `Readonly` **angle**: [`Property`](Property.md)<`unknown`\>

#### Inherited from

[Skew](Skew.md).[angle](Skew.md#angle)

#### Defined in

[src/Transform/Skew.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Skew.ts#L7)

___

### type

• **type**: `string` = `'skewX'`

#### Overrides

[Skew](Skew.md).[type](Skew.md#type)

#### Defined in

[src/Transform/SkewX.ts:6](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/SkewX.ts#L6)

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

[Skew](Skew.md).[apply](Skew.md#apply)

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

[Skew](Skew.md).[unapply](Skew.md#unapply)

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

[Skew](Skew.md).[applyToPoint](Skew.md#applytopoint)

#### Defined in

[src/Transform/Matrix.ts:76](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L76)

## Constructors

### constructor

• **new SkewX**(`document`, `skew`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `skew` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Overrides

[Skew](Skew.md).[constructor](Skew.md#constructor)

#### Defined in

[src/Transform/SkewX.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/SkewX.ts#L8)
