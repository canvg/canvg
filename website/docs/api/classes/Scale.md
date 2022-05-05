---
id: "Scale"
title: "Class: Scale"
sidebar_label: "Scale"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### type

• **type**: `string` = `'scale'`

#### Defined in

[src/Transform/Scale.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L8)

___

### scale

• `Private` `Readonly` **scale**: [`Point`](Point.md)

#### Defined in

[src/Transform/Scale.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L9)

___

### originX

• `Private` `Readonly` **originX**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Scale.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L10)

___

### originY

• `Private` `Readonly` **originY**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Scale.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L11)

## Constructors

### constructor

• **new Scale**(`_`, `scale`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`Document`](Document.md) |
| `scale` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Defined in

[src/Transform/Scale.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L13)

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

[src/Transform/Scale.ts:33](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L33)

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

[src/Transform/Scale.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L50)

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

[src/Transform/Scale.ts:67](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Scale.ts#L67)
