---
id: "Font"
title: "Class: Font"
sidebar_label: "Font"
sidebar_position: 0
custom_edit_url: null
---

## Methods

### parse

▸ `Static` **parse**(`font?`, `inherit?`): [`Font`](Font.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `font` | `string` | `''` |
| `inherit?` | `string` \| [`Font`](Font.md) | `undefined` |

#### Returns

[`Font`](Font.md)

#### Defined in

[src/Font.ts:85](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L85)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/Font.ts:195](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L195)

## Properties

### styles

▪ `Static` `Readonly` **styles**: ``"normal|italic|oblique|inherit"``

#### Defined in

[src/Font.ts:164](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L164)

___

### variants

▪ `Static` `Readonly` **variants**: ``"normal|small-caps|inherit"``

#### Defined in

[src/Font.ts:165](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L165)

___

### weights

▪ `Static` `Readonly` **weights**: ``"normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit"``

#### Defined in

[src/Font.ts:166](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L166)

___

### fontFamily

• `Readonly` **fontFamily**: `string`

#### Defined in

[src/Font.ts:168](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L168)

___

### fontSize

• `Readonly` **fontSize**: `string`

#### Defined in

[src/Font.ts:169](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L169)

___

### fontStyle

• `Readonly` **fontStyle**: `string`

#### Defined in

[src/Font.ts:170](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L170)

___

### fontWeight

• `Readonly` **fontWeight**: `string`

#### Defined in

[src/Font.ts:171](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L171)

___

### fontVariant

• `Readonly` **fontVariant**: `string`

#### Defined in

[src/Font.ts:172](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L172)

## Constructors

### constructor

• **new Font**(`fontStyle`, `fontVariant`, `fontWeight`, `fontSize`, `fontFamily`, `inherit?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontStyle` | `string` |
| `fontVariant` | `string` |
| `fontWeight` | `string` |
| `fontSize` | `string` |
| `fontFamily` | `string` |
| `inherit?` | `string` \| [`Font`](Font.md) |

#### Defined in

[src/Font.ts:174](https://github.com/canvg/canvg/blob/5c58ee8/src/Font.ts#L174)
