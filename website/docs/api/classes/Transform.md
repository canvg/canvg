---
id: "Transform"
title: "Class: Transform"
sidebar_label: "Transform"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### fromElement

▸ `Static` **fromElement**(`document`, `element`): [`Transform`](Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `element` | [`Element`](Element.md) |

#### Returns

[`Transform`](Transform.md)

#### Defined in

[src/Transform/Transform.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L38)

___

### apply

▸ **apply**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Transform/Transform.ts:90](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L90)

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

[src/Transform/Transform.ts:94](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L94)

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

[src/Transform/Transform.ts:99](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L99)

## Properties

### transformTypes

▪ `Static` **transformTypes**: `Record`<`string`, `ITransformConstructor`\>

#### Defined in

[src/Transform/Transform.ts:58](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L58)

___

### transforms

• `Private` `Readonly` **transforms**: `ITransform`[] = `[]`

#### Defined in

[src/Transform/Transform.ts:67](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L67)

## Constructors

### constructor

• **new Transform**(`document`, `transform`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `transform` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Defined in

[src/Transform/Transform.ts:69](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Transform.ts#L69)
