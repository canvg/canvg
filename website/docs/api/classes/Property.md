---
id: "Property"
title: "Class: Property<T>"
sidebar_label: "Property"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Methods

### empty

▸ `Static` **empty**(`document`): [`Property`](Property.md)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |

#### Returns

[`Property`](Property.md)<`string`\>

#### Defined in

[src/Property.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L16)

___

### split

▸ **split**(`separator?`): [`Property`](Property.md)<`string`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `separator` | `string` | `' '` |

#### Returns

[`Property`](Property.md)<`string`\>[]

#### Defined in

[src/Property.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L42)

___

### hasValue

▸ **hasValue**(`zeroIsValue?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zeroIsValue?` | `boolean` |

#### Returns

`boolean`

#### Defined in

[src/Property.ts:54](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L54)

___

### isString

▸ **isString**(`regexp?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `regexp?` | `RegExp` |

#### Returns

`boolean`

#### Defined in

[src/Property.ts:63](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L63)

___

### isUrlDefinition

▸ **isUrlDefinition**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Property.ts:74](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L74)

___

### isPixels

▸ **isPixels**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Property.ts:78](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L78)

___

### setValue

▸ **setValue**(`value`): [`Property`](Property.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Property`](Property.md)<`T`\>

#### Defined in

[src/Property.ts:95](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L95)

___

### getValue

▸ **getValue**(`def?`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `def?` | `T` |

#### Returns

`T`

#### Defined in

[src/Property.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L100)

___

### getNumber

▸ **getNumber**(`def?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `def?` | `T` |

#### Returns

`number`

#### Defined in

[src/Property.ts:108](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L108)

___

### getString

▸ **getString**(`def?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `def?` | `T` |

#### Returns

`string`

#### Defined in

[src/Property.ts:129](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L129)

___

### getColor

▸ **getColor**(`def?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `def?` | `T` |

#### Returns

`string`

#### Defined in

[src/Property.ts:139](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L139)

___

### getDpi

▸ **getDpi**(): `number`

#### Returns

`number`

#### Defined in

[src/Property.ts:153](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L153)

___

### getRem

▸ **getRem**(): `number`

#### Returns

`number`

#### Defined in

[src/Property.ts:157](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L157)

___

### getEm

▸ **getEm**(): `number`

#### Returns

`number`

#### Defined in

[src/Property.ts:161](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L161)

___

### getUnits

▸ **getUnits**(): `string`

#### Returns

`string`

#### Defined in

[src/Property.ts:165](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L165)

___

### getPixels

▸ **getPixels**(`axis?`, `processPercent?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `axis?` | [`Axis`](../#axis) |
| `processPercent?` | `boolean` |

#### Returns

`number`

#### Defined in

[src/Property.ts:169](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L169)

▸ **getPixels**(`isFontSize?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isFontSize?` | `boolean` |

#### Returns

`number`

#### Defined in

[src/Property.ts:170](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L170)

___

### getMilliseconds

▸ **getMilliseconds**(): `number`

#### Returns

`number`

#### Defined in

[src/Property.ts:253](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L253)

___

### getRadians

▸ **getRadians**(): `number`

#### Returns

`number`

#### Defined in

[src/Property.ts:265](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L265)

___

### getDefinition

▸ **getDefinition**<`T`\>(): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Element`](Element.md)<`T`\> |

#### Returns

`T`

#### Defined in

[src/Property.ts:285](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L285)

___

### getFillStyleDefinition

▸ **getFillStyleDefinition**(`element`, `opacity`): `string` \| `CanvasGradient` \| `CanvasPattern`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) \| [`PathElement`](PathElement.md) |
| `opacity` | [`Property`](Property.md)<`unknown`\> |

#### Returns

`string` \| `CanvasGradient` \| `CanvasPattern`

#### Defined in

[src/Property.ts:293](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L293)

___

### getTextBaseline

▸ **getTextBaseline**(): `string`

#### Returns

`string`

#### Defined in

[src/Property.ts:329](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L329)

___

### addOpacity

▸ **addOpacity**(`opacity`): [`Property`](Property.md)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opacity` | [`Property`](Property.md)<`unknown`\> |

#### Returns

[`Property`](Property.md)<`string`\>

#### Defined in

[src/Property.ts:339](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L339)

## Properties

### textBaselineMapping

▪ `Static` `Readonly` **textBaselineMapping**: `Record`<`string`, `string`\>

#### Defined in

[src/Property.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L20)

___

### isNormalizedColor

• `Private` **isNormalizedColor**: `boolean` = `false`

#### Defined in

[src/Property.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L34)

## Constructors

### constructor

• **new Property**<`T`\>(`document`, `name`, `value`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `name` | `string` |
| `value` | `T` |

#### Defined in

[src/Property.ts:36](https://github.com/canvg/canvg/blob/5c58ee8/src/Property.ts#L36)
