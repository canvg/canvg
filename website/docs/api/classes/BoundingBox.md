---
id: "BoundingBox"
title: "Class: BoundingBox"
sidebar_label: "BoundingBox"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new BoundingBox**(`x1?`, `y1?`, `x2?`, `y2?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x1` | `number` | `Number.NaN` |
| `y1` | `number` | `Number.NaN` |
| `x2` | `number` | `Number.NaN` |
| `y2` | `number` | `Number.NaN` |

#### Defined in

[src/BoundingBox.ts:3](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L3)

## Properties

### x1

• **x1**: `number` = `Number.NaN`

___

### y1

• **y1**: `number` = `Number.NaN`

___

### x2

• **x2**: `number` = `Number.NaN`

___

### y2

• **y2**: `number` = `Number.NaN`

## Accessors

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Defined in

[src/BoundingBox.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L13)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Defined in

[src/BoundingBox.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L17)

___

### width

• `get` **width**(): `number`

#### Returns

`number`

#### Defined in

[src/BoundingBox.ts:21](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L21)

___

### height

• `get` **height**(): `number`

#### Returns

`number`

#### Defined in

[src/BoundingBox.ts:25](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L25)

## Methods

### addPoint

▸ **addPoint**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:29](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L29)

___

### addX

▸ **addX**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:61](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L61)

___

### addY

▸ **addY**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:65](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L65)

___

### addBoundingBox

▸ **addBoundingBox**(`boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:69](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L69)

___

### sumCubic

▸ `Private` **sumCubic**(`t`, `p0`, `p1`, `p2`, `p3`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |
| `p0` | `number` |
| `p1` | `number` |
| `p2` | `number` |
| `p3` | `number` |

#### Returns

`number`

#### Defined in

[src/BoundingBox.ts:85](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L85)

___

### bezierCurveAdd

▸ `Private` **bezierCurveAdd**(`forX`, `p0`, `p1`, `p2`, `p3`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `forX` | `boolean` |
| `p0` | `number` |
| `p1` | `number` |
| `p2` | `number` |
| `p3` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L100)

___

### addBezierCurve

▸ **addBezierCurve**(`p0x`, `p0y`, `p1x`, `p1y`, `p2x`, `p2y`, `p3x`, `p3y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p0x` | `number` |
| `p0y` | `number` |
| `p1x` | `number` |
| `p1y` | `number` |
| `p2x` | `number` |
| `p2y` | `number` |
| `p3x` | `number` |
| `p3y` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:161](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L161)

___

### addQuadraticCurve

▸ **addQuadraticCurve**(`p0x`, `p0y`, `p1x`, `p1y`, `p2x`, `p2y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p0x` | `number` |
| `p0y` | `number` |
| `p1x` | `number` |
| `p1y` | `number` |
| `p2x` | `number` |
| `p2y` | `number` |

#### Returns

`void`

#### Defined in

[src/BoundingBox.ts:177](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L177)

___

### isPointInBox

▸ **isPointInBox**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`boolean`

#### Defined in

[src/BoundingBox.ts:193](https://github.com/canvg/canvg/blob/5c58ee8/src/BoundingBox.ts#L193)
