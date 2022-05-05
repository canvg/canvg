---
id: "TextElement"
title: "Class: TextElement"
sidebar_label: "TextElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RenderedElement`](RenderedElement.md)

  ↳ **`TextElement`**

  ↳↳ [`TSpanElement`](TSpanElement.md)

  ↳↳ [`TRefElement`](TRefElement.md)

  ↳↳ [`AElement`](AElement.md)

  ↳↳ [`TextPathElement`](TextPathElement.md)

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

• **type**: `string` = `'text'`

#### Overrides

[RenderedElement](RenderedElement.md).[type](RenderedElement.md#type)

#### Defined in

[src/Document/TextElement.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L17)

___

### x

• `Protected` **x**: `number` = `0`

#### Defined in

[src/Document/TextElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L18)

___

### y

• `Protected` **y**: `number` = `0`

#### Defined in

[src/Document/TextElement.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L19)

___

### leafTexts

• `Private` **leafTexts**: [`TextElement`](TextElement.md)[] = `[]`

#### Defined in

[src/Document/TextElement.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L20)

___

### textChunkStart

• `Private` **textChunkStart**: `number` = `0`

#### Defined in

[src/Document/TextElement.ts:21](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L21)

___

### minX

• `Private` **minX**: `number` = `Number.POSITIVE_INFINITY`

#### Defined in

[src/Document/TextElement.ts:22](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L22)

___

### maxX

• `Private` **maxX**: `number` = `Number.NEGATIVE_INFINITY`

#### Defined in

[src/Document/TextElement.ts:23](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L23)

___

### measureCache

• `Private` **measureCache**: `number` = `-1`

#### Defined in

[src/Document/TextElement.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L24)

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

### calculateOpacity

▸ `Protected` **calculateOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[RenderedElement](RenderedElement.md).[calculateOpacity](RenderedElement.md#calculateopacity)

#### Defined in

[src/Document/RenderedElement.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L13)

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

#### Overrides

[RenderedElement](RenderedElement.md).[setContext](RenderedElement.md#setcontext)

#### Defined in

[src/Document/TextElement.ts:40](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L40)

___

### initializeCoordinates

▸ `Protected` **initializeCoordinates**(): `void`

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:51](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L51)

___

### getBoundingBox

▸ **getBoundingBox**(`ctx`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Defined in

[src/Document/TextElement.ts:60](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L60)

___

### getFontSize

▸ `Protected` **getFontSize**(): `number`

#### Returns

`number`

#### Defined in

[src/Document/TextElement.ts:85](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L85)

___

### getTElementBoundingBox

▸ `Protected` **getTElementBoundingBox**(`ctx`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Defined in

[src/Document/TextElement.ts:96](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L96)

___

### getGlyph

▸ **getGlyph**(`font`, `text`, `i`): [`GlyphElement`](GlyphElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `font` | [`FontElement`](FontElement.md) |
| `text` | `string` |
| `i` | `number` |

#### Returns

[`GlyphElement`](GlyphElement.md)

#### Defined in

[src/Document/TextElement.ts:107](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L107)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[src/Document/TextElement.ts:145](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L145)

___

### getTextFromNode

▸ `Protected` **getTextFromNode**(`node?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `ChildNode` |

#### Returns

`string`

#### Defined in

[src/Document/TextElement.ts:149](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L149)

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

[src/Document/TextElement.ts:172](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L172)

___

### renderTElementChildren

▸ `Protected` **renderTElementChildren**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:198](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L198)

___

### applyAnchoring

▸ `Protected` **applyAnchoring**(): `void`

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:277](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L277)

___

### adjustChildCoordinatesRecursive

▸ `Protected` **adjustChildCoordinatesRecursive**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:309](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L309)

___

### adjustChildCoordinatesRecursiveCore

▸ `Protected` **adjustChildCoordinatesRecursiveCore**(`ctx`, `textParent`, `parent`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `textParent` | [`TextElement`](TextElement.md) |
| `parent` | [`Element`](Element.md) |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:316](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L316)

___

### adjustChildCoordinates

▸ `Protected` **adjustChildCoordinates**(`ctx`, `textParent`, `parent`, `i`): [`TextElement`](TextElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `textParent` | [`TextElement`](TextElement.md) |
| `parent` | [`Element`](Element.md) |
| `i` | `number` |

#### Returns

[`TextElement`](TextElement.md)

#### Defined in

[src/Document/TextElement.ts:334](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L334)

___

### getChildBoundingBox

▸ `Protected` **getChildBoundingBox**(`ctx`, `textParent`, `parent`, `i`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `textParent` | [`TextElement`](TextElement.md) |
| `parent` | [`Element`](Element.md) |
| `i` | `number` |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Defined in

[src/Document/TextElement.ts:432](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L432)

___

### renderChild

▸ `Protected` **renderChild**(`ctx`, `textParent`, `parent`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `textParent` | [`TextElement`](TextElement.md) |
| `parent` | [`Element`](Element.md) |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[src/Document/TextElement.ts:458](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L458)

___

### measureText

▸ `Protected` **measureText**(`ctx`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`number`

#### Defined in

[src/Document/TextElement.ts:472](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L472)

___

### measureTargetText

▸ `Protected` **measureTargetText**(`ctx`, `targetText`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `targetText` | `string` |

#### Returns

`number`

#### Defined in

[src/Document/TextElement.ts:487](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L487)

___

### getInheritedAttribute

▸ `Protected` **getInheritedAttribute**(`name`): `string`

Inherits positional attributes from [TextElement](TextElement.md) parent(s). Attributes
are only inherited from a parent to its first child.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The attribute name. |

#### Returns

`string`

The attribute value or null.

#### Defined in

[src/Document/TextElement.ts:544](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L544)

## Constructors

### constructor

• **new TextElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[RenderedElement](RenderedElement.md).[constructor](RenderedElement.md#constructor)

#### Defined in

[src/Document/TextElement.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L26)
