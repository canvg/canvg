---
id: "Rotate"
title: "Class: Rotate"
sidebar_label: "Rotate"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### type

• **type**: `string` = `'rotate'`

#### Defined in

[src/Transform/Rotate.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L8)

___

### angle

• `Private` `Readonly` **angle**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Rotate.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L9)

___

### originX

• `Private` `Readonly` **originX**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Rotate.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L10)

___

### originY

• `Private` `Readonly` **originY**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Transform/Rotate.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L11)

___

### cx

• `Private` `Readonly` **cx**: `number`

#### Defined in

[src/Transform/Rotate.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L12)

___

### cy

• `Private` `Readonly` **cy**: `number`

#### Defined in

[src/Transform/Rotate.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L13)

## Constructors

### constructor

• **new Rotate**(`document`, `rotate`, `transformOrigin`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `rotate` | `string` |
| `transformOrigin` | readonly [[`Property`](Property.md)<`string`\>, [`Property`](Property.md)<`string`\>] |

#### Defined in

[src/Transform/Rotate.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L15)

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

[src/Transform/Rotate.ts:29](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L29)

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

[src/Transform/Rotate.ts:45](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L45)

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

[src/Transform/Rotate.ts:61](https://github.com/canvg/canvg/blob/5c58ee8/src/Transform/Rotate.ts#L61)
