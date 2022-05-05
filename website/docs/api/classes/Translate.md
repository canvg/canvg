---
id: "Translate"
title: "Class: Translate"
sidebar_label: "Translate"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### type

• **type**: `string` = `'translate'`

#### Defined in

[src/Transform/Translate.ts:6](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L6)

___

### point

• `Private` `Readonly` **point**: [`Point`](Point.md)

#### Defined in

[src/Transform/Translate.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L7)

## Constructors

### constructor

• **new Translate**(`_`, `point`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`Document`](Document.md) |
| `point` | `string` |

#### Defined in

[src/Transform/Translate.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L9)

## Methods

### apply

▸ **apply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Transform/Translate.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L16)

___

### unapply

▸ **unapply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Transform/Translate.ts:28](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L28)

___

### applyToPoint

▸ **applyToPoint**(`point`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |

#### Returns

`void`

#### Defined in

[src/Transform/Translate.ts:40](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Translate.ts#L40)
