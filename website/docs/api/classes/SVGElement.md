---
id: "SVGElement"
title: "Class: SVGElement"
sidebar_label: "SVGElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RenderedElement`](RenderedElement.md)

  ↳ **`SVGElement`**

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[RenderedElement](RenderedElement.md).[ignoreChildTypes](RenderedElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[RenderedElement](RenderedElement.md).[attributes](RenderedElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[RenderedElement](RenderedElement.md).[styles](RenderedElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[RenderedElement](RenderedElement.md).[stylesSpecificity](RenderedElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[RenderedElement](RenderedElement.md).[animationFrozen](RenderedElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[RenderedElement](RenderedElement.md).[animationFrozenValue](RenderedElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[RenderedElement](RenderedElement.md).[parent](RenderedElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[RenderedElement](RenderedElement.md).[children](RenderedElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[RenderedElement](RenderedElement.md).[document](RenderedElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[RenderedElement](RenderedElement.md).[node](RenderedElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[RenderedElement](RenderedElement.md).[captureTextNodes](RenderedElement.md#capturetextnodes)

___

### type

• **type**: `string` = `'svg'`

#### Overrides

[RenderedElement](RenderedElement.md).[type](RenderedElement.md#type)

#### Defined in

[src/Document/SVGElement.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/SVGElement.ts#L8)

___

### root

• **root**: `boolean` = `false`

#### Defined in

[src/Document/SVGElement.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/SVGElement.ts#L9)

## Constructors

### constructor

• **new SVGElement**(`document`, `node?`, `captureTextNodes?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `document` | [`Document`](Document.md) | `undefined` |
| `node?` | `HTMLElement` | `undefined` |
| `captureTextNodes` | `boolean` | `false` |

#### Inherited from

[RenderedElement](RenderedElement.md).[constructor](RenderedElement.md#constructor)

#### Defined in

[src/Document/Element.ts:22](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L22)

## Methods

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

[RenderedElement](RenderedElement.md).[getAttribute](RenderedElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[RenderedElement](RenderedElement.md).[getHrefAttribute](RenderedElement.md#gethrefattribute)

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

[RenderedElement](RenderedElement.md).[getStyle](RenderedElement.md#getstyle)

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

[RenderedElement](RenderedElement.md).[render](RenderedElement.md#render)

#### Defined in

[src/Document/Element.ts:151](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L151)

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

[RenderedElement](RenderedElement.md).[applyEffects](RenderedElement.md#applyeffects)

#### Defined in

[src/Document/Element.ts:190](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L190)

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

[RenderedElement](RenderedElement.md).[renderChildren](RenderedElement.md#renderchildren)

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

[RenderedElement](RenderedElement.md).[addChild](RenderedElement.md#addchild)

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

[RenderedElement](RenderedElement.md).[matchesSelector](RenderedElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[RenderedElement](RenderedElement.md).[addStylesFromStyleDefinition](RenderedElement.md#addstylesfromstyledefinition)

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

[RenderedElement](RenderedElement.md).[removeStyles](RenderedElement.md#removestyles)

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

[RenderedElement](RenderedElement.md).[restoreStyles](RenderedElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[RenderedElement](RenderedElement.md).[isFirstChild](RenderedElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

___

### calculateOpacity

▸ `Protected` **calculateOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[RenderedElement](RenderedElement.md).[calculateOpacity](RenderedElement.md#calculateopacity)

#### Defined in

[src/Document/RenderedElement.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L13)

___

### setContext

▸ **setContext**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Overrides

[RenderedElement](RenderedElement.md).[setContext](RenderedElement.md#setcontext)

#### Defined in

[src/Document/SVGElement.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/SVGElement.ts#L11)

___

### clearContext

▸ **clearContext**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Overrides

[RenderedElement](RenderedElement.md).[clearContext](RenderedElement.md#clearcontext)

#### Defined in

[src/Document/SVGElement.ts:142](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/SVGElement.ts#L142)

___

### resize

▸ **resize**(`width`, `height?`, `preserveAspectRatio?`): `void`

Resize SVG to fit in given size.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `width` | `number` | `undefined` |
| `height` | `number` | `width` |
| `preserveAspectRatio` | `string` \| `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/Document/SVGElement.ts:154](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/SVGElement.ts#L154)
