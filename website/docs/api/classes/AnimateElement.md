---
id: "AnimateElement"
title: "Class: AnimateElement"
sidebar_label: "AnimateElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Element`](Element.md)

  ↳ **`AnimateElement`**

  ↳↳ [`AnimateColorElement`](AnimateColorElement.md)

  ↳↳ [`AnimateTransformElement`](AnimateTransformElement.md)

## Properties

### type

• **type**: `string` = `'animate'`

#### Overrides

[Element](Element.md).[type](Element.md#type)

#### Defined in

[src/Document/AnimateElement.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L12)

___

### begin

• `Protected` `Readonly` **begin**: `number`

#### Defined in

[src/Document/AnimateElement.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L13)

___

### maxDuration

• `Protected` `Readonly` **maxDuration**: `number`

#### Defined in

[src/Document/AnimateElement.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L14)

___

### from

• `Protected` `Readonly` **from**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Document/AnimateElement.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L15)

___

### to

• `Protected` `Readonly` **to**: [`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Document/AnimateElement.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L16)

___

### values

• `Protected` `Readonly` **values**: [`Property`](Property.md)<`string`[]\>

#### Defined in

[src/Document/AnimateElement.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L17)

___

### duration

• `Protected` **duration**: `number` = `0`

#### Defined in

[src/Document/AnimateElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L18)

___

### initialValue

• `Protected` **initialValue**: `string`

#### Defined in

[src/Document/AnimateElement.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L19)

___

### initialUnits

• `Protected` **initialUnits**: `string` = `''`

#### Defined in

[src/Document/AnimateElement.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L20)

___

### removed

• `Protected` **removed**: `boolean` = `false`

#### Defined in

[src/Document/AnimateElement.ts:21](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L21)

___

### frozen

• `Protected` **frozen**: `boolean` = `false`

#### Defined in

[src/Document/AnimateElement.ts:22](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L22)

___

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[Element](Element.md).[ignoreChildTypes](Element.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[Element](Element.md).[attributes](Element.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[Element](Element.md).[styles](Element.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[Element](Element.md).[stylesSpecificity](Element.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[Element](Element.md).[animationFrozen](Element.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[Element](Element.md).[animationFrozenValue](Element.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[Element](Element.md).[parent](Element.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[Element](Element.md).[children](Element.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[Element](Element.md).[document](Element.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[Element](Element.md).[node](Element.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[Element](Element.md).[captureTextNodes](Element.md#capturetextnodes)

## Constructors

### constructor

• **new AnimateElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[Element](Element.md).[constructor](Element.md#constructor)

#### Defined in

[src/Document/AnimateElement.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L24)

## Methods

### getProperty

▸ `Protected` **getProperty**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Defined in

[src/Document/AnimateElement.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L46)

___

### calcValue

▸ **calcValue**(): `string`

#### Returns

`string`

#### Defined in

[src/Document/AnimateElement.ts:57](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L57)

___

### update

▸ **update**(`delta`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

`boolean`

#### Defined in

[src/Document/AnimateElement.ts:74](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AnimateElement.ts#L74)

___

### getProgress

▸ **getProgress**(): `IProgress`

#### Returns

`IProgress`

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

[Element](Element.md).[getAttribute](Element.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[Element](Element.md).[getHrefAttribute](Element.md#gethrefattribute)

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

[Element](Element.md).[getStyle](Element.md#getstyle)

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

[Element](Element.md).[render](Element.md#render)

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

[Element](Element.md).[setContext](Element.md#setcontext)

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

[Element](Element.md).[applyEffects](Element.md#applyeffects)

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

[Element](Element.md).[clearContext](Element.md#clearcontext)

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

[Element](Element.md).[renderChildren](Element.md#renderchildren)

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

[Element](Element.md).[addChild](Element.md#addchild)

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

[Element](Element.md).[matchesSelector](Element.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[Element](Element.md).[addStylesFromStyleDefinition](Element.md#addstylesfromstyledefinition)

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

[Element](Element.md).[removeStyles](Element.md#removestyles)

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

[Element](Element.md).[restoreStyles](Element.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Element](Element.md).[isFirstChild](Element.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)
