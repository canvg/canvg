---
id: "ImageElement"
title: "Class: ImageElement"
sidebar_label: "ImageElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RenderedElement`](RenderedElement.md)

  ↳ **`ImageElement`**

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

• **type**: `string` = `'image'`

#### Overrides

[RenderedElement](RenderedElement.md).[type](RenderedElement.md#type)

#### Defined in

[src/Document/ImageElement.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L10)

___

### loaded

• **loaded**: `boolean` = `false`

#### Defined in

[src/Document/ImageElement.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L11)

___

### image

• `Protected` **image**: `string` \| `CanvasImageSource`

#### Defined in

[src/Document/ImageElement.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L12)

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

### loadImage

▸ `Protected` **loadImage**(`href`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `href` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Document/ImageElement.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L38)

___

### loadSvg

▸ `Protected` **loadSvg**(`href`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `href` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Document/ImageElement.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L50)

___

### renderChildren

▸ **renderChildren**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Overrides

[RenderedElement](RenderedElement.md).[renderChildren](RenderedElement.md#renderchildren)

#### Defined in

[src/Document/ImageElement.ts:77](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L77)

___

### getBoundingBox

▸ **getBoundingBox**(): [`BoundingBox`](BoundingBox.md)

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Defined in

[src/Document/ImageElement.ts:139](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L139)

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

▸ **setContext**(`ctx`, `fromMeasure?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | `undefined` |
| `fromMeasure` | `boolean` | `false` |

#### Returns

`void`

#### Inherited from

[RenderedElement](RenderedElement.md).[setContext](RenderedElement.md#setcontext)

#### Defined in

[src/Document/RenderedElement.ts:31](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L31)

___

### clearContext

▸ **clearContext**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[RenderedElement](RenderedElement.md).[clearContext](RenderedElement.md#clearcontext)

#### Defined in

[src/Document/RenderedElement.ts:215](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L215)

## Constructors

### constructor

• **new ImageElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[RenderedElement](RenderedElement.md).[constructor](RenderedElement.md#constructor)

#### Defined in

[src/Document/ImageElement.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/ImageElement.ts#L14)
