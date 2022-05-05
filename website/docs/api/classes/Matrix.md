---
id: "Matrix"
title: "Class: Matrix"
sidebar_label: "Matrix"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`Matrix`**

  ↳ [`Skew`](Skew.md)

## Implements

- `ITransform`

## Properties

### type

• **type**: `string` = `'matrix'`

#### Implementation of

ITransform.type

#### Defined in

[src/Transform/Matrix.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L9)

___

### matrix

• `Protected` **matrix**: [`MatrixValue`](../#matrixvalue)

#### Defined in

[src/Transform/Matrix.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L10)

___

### originX

• `Private` `Readonly` **originX**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Matrix.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L11)

___

### originY

• `Private` `Readonly` **originY**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Matrix.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L12)

## Constructors

### constructor

• **new Matrix**(`_`, `matrix`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`Document`](Document.md) |
| `matrix` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Defined in

[src/Transform/Matrix.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L14)

## Methods

### apply

▸ **apply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Implementation of

ITransform.apply

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

#### Implementation of

ITransform.unapply

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

#### Implementation of

ITransform.applyToPoint

#### Defined in

[src/Transform/Matrix.ts:76](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Matrix.ts#L76)
