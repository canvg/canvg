---
id: "PathParser"
title: "Class: PathParser"
sidebar_label: "PathParser"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `SVGPathData`

  ↳ **`PathParser`**

## Properties

### control

• **control**: [`Point`](Point.md)

#### Defined in

[src/PathParser.ts:31](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L31)

___

### start

• **start**: [`Point`](Point.md)

#### Defined in

[src/PathParser.ts:32](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L32)

___

### current

• **current**: [`Point`](Point.md)

#### Defined in

[src/PathParser.ts:33](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L33)

___

### command

• **command**: [`Command`](../#command) = `null`

#### Defined in

[src/PathParser.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L34)

___

### commands

• `Readonly` **commands**: [`Command`](../#command)[]

#### Overrides

SVGPathData.commands

#### Defined in

[src/PathParser.ts:35](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L35)

___

### i

• `Private` **i**: `number` = `-1`

#### Defined in

[src/PathParser.ts:36](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L36)

___

### previousCommand

• `Private` **previousCommand**: [`Command`](../#command) = `null`

#### Defined in

[src/PathParser.ts:37](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L37)

___

### points

• `Private` **points**: [`Point`](Point.md)[] = `[]`

#### Defined in

[src/PathParser.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L38)

___

### angles

• `Private` **angles**: `number`[] = `[]`

#### Defined in

[src/PathParser.ts:39](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L39)

## Constructors

### constructor

• **new PathParser**(`path`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Overrides

SVGPathData.constructor

#### Defined in

[src/PathParser.ts:41](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L41)

## Methods

### reset

▸ **reset**(): `void`

#### Returns

`void`

#### Defined in

[src/PathParser.ts:51](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L51)

___

### isEnd

▸ **isEnd**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/PathParser.ts:62](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L62)

___

### next

▸ **next**(): [`Command`](../#command)

#### Returns

[`Command`](../#command)

#### Defined in

[src/PathParser.ts:71](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L71)

___

### getPoint

▸ **getPoint**(`xProp?`, `yProp?`): [`Point`](Point.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `xProp` | `string` | `'x'` |
| `yProp` | `string` | `'y'` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/PathParser.ts:80](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L80)

___

### getAsControlPoint

▸ **getAsControlPoint**(`xProp?`, `yProp?`): [`Point`](Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `xProp?` | `string` |
| `yProp?` | `string` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/PathParser.ts:89](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L89)

___

### getAsCurrentPoint

▸ **getAsCurrentPoint**(`xProp?`, `yProp?`): [`Point`](Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `xProp?` | `string` |
| `yProp?` | `string` |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/PathParser.ts:97](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L97)

___

### getReflectedControlPoint

▸ **getReflectedControlPoint**(): [`Point`](Point.md)

#### Returns

[`Point`](Point.md)

#### Defined in

[src/PathParser.ts:105](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L105)

___

### makeAbsolute

▸ **makeAbsolute**(`point`): [`Point`](Point.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |

#### Returns

[`Point`](Point.md)

#### Defined in

[src/PathParser.ts:132](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L132)

___

### addMarker

▸ **addMarker**(`point`, `from?`, `priorTo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |
| `from?` | [`Point`](Point.md) |
| `priorTo?` | [`Point`](Point.md) |

#### Returns

`void`

#### Defined in

[src/PathParser.ts:146](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L146)

___

### addMarkerAngle

▸ **addMarkerAngle**(`point`, `angle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |
| `angle` | `number` |

#### Returns

`void`

#### Defined in

[src/PathParser.ts:160](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L160)

___

### getMarkerPoints

▸ **getMarkerPoints**(): [`Point`](Point.md)[]

#### Returns

[`Point`](Point.md)[]

#### Defined in

[src/PathParser.ts:165](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L165)

___

### getMarkerAngles

▸ **getMarkerAngles**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/PathParser.ts:169](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L169)
