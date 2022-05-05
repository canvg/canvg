---
id: "AnimateColorElement"
title: "Class: AnimateColorElement"
sidebar_label: "AnimateColorElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`AnimateElement`](AnimateElement.md)

  ↳ **`AnimateColorElement`**

## Properties

### type

• **type**: `string` = `'animateColor'`

#### Overrides

[AnimateElement](AnimateElement.md).[type](AnimateElement.md#type)

#### Defined in

[src/Document/AnimateColorElement.ts:5](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateColorElement.ts#L5)

___

### begin

• `Protected` `Readonly` **begin**: `number`

#### Inherited from

[AnimateElement](AnimateElement.md).[begin](AnimateElement.md#begin)

#### Defined in

[src/Document/AnimateElement.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L13)

___

### maxDuration

• `Protected` `Readonly` **maxDuration**: `number`

#### Inherited from

[AnimateElement](AnimateElement.md).[maxDuration](AnimateElement.md#maxduration)

#### Defined in

[src/Document/AnimateElement.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L14)

___

### from

• `Protected` `Readonly` **from**: [`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[from](AnimateElement.md#from)

#### Defined in

[src/Document/AnimateElement.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L15)

___

### to

• `Protected` `Readonly` **to**: [`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[to](AnimateElement.md#to)

#### Defined in

[src/Document/AnimateElement.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L16)

___

### values

• `Protected` `Readonly` **values**: [`Property`](Property.md)<`string`[]\>

#### Inherited from

[AnimateElement](AnimateElement.md).[values](AnimateElement.md#values)

#### Defined in

[src/Document/AnimateElement.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L17)

___

### duration

• `Protected` **duration**: `number` = `0`

#### Inherited from

[AnimateElement](AnimateElement.md).[duration](AnimateElement.md#duration)

#### Defined in

[src/Document/AnimateElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L18)

___

### initialValue

• `Protected` **initialValue**: `string`

#### Inherited from

[AnimateElement](AnimateElement.md).[initialValue](AnimateElement.md#initialvalue)

#### Defined in

[src/Document/AnimateElement.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L19)

___

### initialUnits

• `Protected` **initialUnits**: `string` = `''`

#### Inherited from

[AnimateElement](AnimateElement.md).[initialUnits](AnimateElement.md#initialunits)

#### Defined in

[src/Document/AnimateElement.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L20)

___

### removed

• `Protected` **removed**: `boolean` = `false`

#### Inherited from

[AnimateElement](AnimateElement.md).[removed](AnimateElement.md#removed)

#### Defined in

[src/Document/AnimateElement.ts:21](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L21)

___

### frozen

• `Protected` **frozen**: `boolean` = `false`

#### Inherited from

[AnimateElement](AnimateElement.md).[frozen](AnimateElement.md#frozen)

#### Defined in

[src/Document/AnimateElement.ts:22](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L22)

___

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[AnimateElement](AnimateElement.md).[ignoreChildTypes](AnimateElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[AnimateElement](AnimateElement.md).[attributes](AnimateElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[AnimateElement](AnimateElement.md).[styles](AnimateElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[AnimateElement](AnimateElement.md).[stylesSpecificity](AnimateElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[AnimateElement](AnimateElement.md).[animationFrozen](AnimateElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[AnimateElement](AnimateElement.md).[animationFrozenValue](AnimateElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[AnimateElement](AnimateElement.md).[parent](AnimateElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[AnimateElement](AnimateElement.md).[children](AnimateElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[AnimateElement](AnimateElement.md).[document](AnimateElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[AnimateElement](AnimateElement.md).[node](AnimateElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[AnimateElement](AnimateElement.md).[captureTextNodes](AnimateElement.md#capturetextnodes)

## Methods

### calcValue

▸ **calcValue**(): `string`

#### Returns

`string`

#### Overrides

[AnimateElement](AnimateElement.md).[calcValue](AnimateElement.md#calcvalue)

#### Defined in

[src/Document/AnimateColorElement.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateColorElement.ts#L7)

___

### getProperty

▸ `Protected` **getProperty**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[getProperty](AnimateElement.md#getproperty)

#### Defined in

[src/Document/AnimateElement.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L46)

___

### update

▸ **update**(`delta`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

`boolean`

#### Inherited from

[AnimateElement](AnimateElement.md).[update](AnimateElement.md#update)

#### Defined in

[src/Document/AnimateElement.ts:74](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L74)

___

### getProgress

▸ **getProgress**(): `IProgress`

#### Returns

`IProgress`

#### Inherited from

[AnimateElement](AnimateElement.md).[getProgress](AnimateElement.md#getprogress)

#### Defined in

[src/Document/AnimateElement.ts:142](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L142)

___

### getAttribute

▸ **getAttribute**(`name`, `createIfNotExists?`): [`Property`](Property.md)<`unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `createIfNotExists` | `boolean` | `false` |

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[getAttribute](AnimateElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[getHrefAttribute](AnimateElement.md#gethrefattribute)

#### Defined in

[src/Document/Element.ts:101](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L101)

___

### getStyle

▸ **getStyle**(`name`, `createIfNotExists?`, `skipAncestors?`): [`Property`](Property.md)<`unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `createIfNotExists` | `boolean` | `false` |
| `skipAncestors` | `boolean` | `false` |

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[AnimateElement](AnimateElement.md).[getStyle](AnimateElement.md#getstyle)

#### Defined in

[src/Document/Element.ts:114](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L114)

___

### render

▸ **render**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[render](AnimateElement.md#render)

#### Defined in

[src/Document/Element.ts:151](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L151)

___

### setContext

▸ **setContext**(`_`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[setContext](AnimateElement.md#setcontext)

#### Defined in

[src/Document/Element.ts:186](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L186)

___

### applyEffects

▸ `Protected` **applyEffects**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[applyEffects](AnimateElement.md#applyeffects)

#### Defined in

[src/Document/Element.ts:190](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L190)

___

### clearContext

▸ **clearContext**(`_`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[clearContext](AnimateElement.md#clearcontext)

#### Defined in

[src/Document/Element.ts:210](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L210)

___

### renderChildren

▸ **renderChildren**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[renderChildren](AnimateElement.md#renderchildren)

#### Defined in

[src/Document/Element.ts:214](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L214)

___

### addChild

▸ `Protected` **addChild**(`childNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `childNode` | `HTMLElement` \| [`Element`](Element.md) |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[addChild](AnimateElement.md#addchild)

#### Defined in

[src/Document/Element.ts:220](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L220)

___

### matchesSelector

▸ `Protected` **matchesSelector**(`selector`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |

#### Returns

`boolean`

#### Inherited from

[AnimateElement](AnimateElement.md).[matchesSelector](AnimateElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[addStylesFromStyleDefinition](AnimateElement.md#addstylesfromstyledefinition)

#### Defined in

[src/Document/Element.ts:248](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L248)

___

### removeStyles

▸ `Protected` **removeStyles**(`element`, `ignoreStyles`): [`string`, `string`][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `ignoreStyles` | `string`[] |

#### Returns

[`string`, `string`][]

#### Inherited from

[AnimateElement](AnimateElement.md).[removeStyles](AnimateElement.md#removestyles)

#### Defined in

[src/Document/Element.ts:283](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L283)

___

### restoreStyles

▸ `Protected` **restoreStyles**(`element`, `styles`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `styles` | [`string`, `string`][] |

#### Returns

`void`

#### Inherited from

[AnimateElement](AnimateElement.md).[restoreStyles](AnimateElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[AnimateElement](AnimateElement.md).[isFirstChild](AnimateElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

## Constructors

### constructor

• **new AnimateColorElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Inherited from

[AnimateElement](AnimateElement.md).[constructor](AnimateElement.md#constructor)

#### Defined in

[src/Document/AnimateElement.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L24)
