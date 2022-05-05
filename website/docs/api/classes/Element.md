---
id: "Element"
title: "Class: Element"
sidebar_label: "Element"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`Element`**

  ↳ [`UnknownElement`](UnknownElement.md)

  ↳ [`RenderedElement`](RenderedElement.md)

  ↳ [`PatternElement`](PatternElement.md)

  ↳ [`MarkerElement`](MarkerElement.md)

  ↳ [`DefsElement`](DefsElement.md)

  ↳ [`GradientElement`](GradientElement.md)

  ↳ [`StopElement`](StopElement.md)

  ↳ [`AnimateElement`](AnimateElement.md)

  ↳ [`FontElement`](FontElement.md)

  ↳ [`FontFaceElement`](FontFaceElement.md)

  ↳ [`StyleElement`](StyleElement.md)

  ↳ [`MaskElement`](MaskElement.md)

  ↳ [`ClipPathElement`](ClipPathElement.md)

  ↳ [`FilterElement`](FilterElement.md)

  ↳ [`FeDropShadowElement`](FeDropShadowElement.md)

  ↳ [`FeMorphologyElement`](FeMorphologyElement.md)

  ↳ [`FeCompositeElement`](FeCompositeElement.md)

  ↳ [`FeColorMatrixElement`](FeColorMatrixElement.md)

  ↳ [`FeGaussianBlurElement`](FeGaussianBlurElement.md)

  ↳ [`TitleElement`](TitleElement.md)

  ↳ [`DescElement`](DescElement.md)

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### type

• `Readonly` **type**: `string` = `''`

#### Defined in

[src/Document/Element.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L13)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

## Constructors

### constructor

• **new Element**(`document`, `node?`, `captureTextNodes?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `document` | [`Document`](Document.md) | `undefined` |
| `node?` | `HTMLElement` | `undefined` |
| `captureTextNodes` | `boolean` | `false` |

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

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

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

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

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

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)
