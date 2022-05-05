---
id: "AElement"
title: "Class: AElement"
sidebar_label: "AElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`TextElement`](TextElement.md)

  ↳ **`AElement`**

## Properties

### type

• **type**: `string` = `'a'`

#### Overrides

[TextElement](TextElement.md).[type](TextElement.md#type)

#### Defined in

[src/Document/AElement.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L10)

___

### hasText

• `Protected` `Readonly` **hasText**: `boolean`

#### Defined in

[src/Document/AElement.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L11)

___

### text

• `Protected` `Readonly` **text**: `string`

#### Defined in

[src/Document/AElement.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L12)

___

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[TextElement](TextElement.md).[ignoreChildTypes](TextElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[TextElement](TextElement.md).[attributes](TextElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[TextElement](TextElement.md).[styles](TextElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[TextElement](TextElement.md).[stylesSpecificity](TextElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[TextElement](TextElement.md).[animationFrozen](TextElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[TextElement](TextElement.md).[animationFrozenValue](TextElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[TextElement](TextElement.md).[parent](TextElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[TextElement](TextElement.md).[children](TextElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[TextElement](TextElement.md).[document](TextElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[TextElement](TextElement.md).[node](TextElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[TextElement](TextElement.md).[captureTextNodes](TextElement.md#capturetextnodes)

___

### x

• `Protected` **x**: `number` = `0`

#### Inherited from

[TextElement](TextElement.md).[x](TextElement.md#x)

#### Defined in

[src/Document/TextElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L18)

___

### y

• `Protected` **y**: `number` = `0`

#### Inherited from

[TextElement](TextElement.md).[y](TextElement.md#y)

#### Defined in

[src/Document/TextElement.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L19)

## Constructors

### constructor

• **new AElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[TextElement](TextElement.md).[constructor](TextElement.md#constructor)

#### Defined in

[src/Document/AElement.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L14)

## Methods

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Overrides

[TextElement](TextElement.md).[getText](TextElement.md#gettext)

#### Defined in

[src/Document/AElement.ts:32](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L32)

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

[TextElement](TextElement.md).[renderChildren](TextElement.md#renderchildren)

#### Defined in

[src/Document/AElement.ts:36](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L36)

___

### onClick

▸ **onClick**(): `void`

#### Returns

`void`

#### Defined in

[src/Document/AElement.ts:76](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L76)

___

### onMouseMove

▸ **onMouseMove**(): `void`

#### Returns

`void`

#### Defined in

[src/Document/AElement.ts:84](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/AElement.ts#L84)

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

[TextElement](TextElement.md).[getAttribute](TextElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[TextElement](TextElement.md).[getHrefAttribute](TextElement.md#gethrefattribute)

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

[TextElement](TextElement.md).[getStyle](TextElement.md#getstyle)

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

[TextElement](TextElement.md).[render](TextElement.md#render)

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

[TextElement](TextElement.md).[applyEffects](TextElement.md#applyeffects)

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

[TextElement](TextElement.md).[addChild](TextElement.md#addchild)

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

[TextElement](TextElement.md).[matchesSelector](TextElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[TextElement](TextElement.md).[addStylesFromStyleDefinition](TextElement.md#addstylesfromstyledefinition)

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

[TextElement](TextElement.md).[removeStyles](TextElement.md#removestyles)

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

[TextElement](TextElement.md).[restoreStyles](TextElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[TextElement](TextElement.md).[isFirstChild](TextElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

___

### calculateOpacity

▸ `Protected` **calculateOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[TextElement](TextElement.md).[calculateOpacity](TextElement.md#calculateopacity)

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

[TextElement](TextElement.md).[clearContext](TextElement.md#clearcontext)

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

#### Inherited from

[TextElement](TextElement.md).[setContext](TextElement.md#setcontext)

#### Defined in

[src/Document/TextElement.ts:40](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L40)

___

### initializeCoordinates

▸ `Protected` **initializeCoordinates**(): `void`

#### Returns

`void`

#### Inherited from

[TextElement](TextElement.md).[initializeCoordinates](TextElement.md#initializecoordinates)

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

#### Inherited from

[TextElement](TextElement.md).[getBoundingBox](TextElement.md#getboundingbox)

#### Defined in

[src/Document/TextElement.ts:60](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L60)

___

### getFontSize

▸ `Protected` **getFontSize**(): `number`

#### Returns

`number`

#### Inherited from

[TextElement](TextElement.md).[getFontSize](TextElement.md#getfontsize)

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

#### Inherited from

[TextElement](TextElement.md).[getTElementBoundingBox](TextElement.md#gettelementboundingbox)

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

#### Inherited from

[TextElement](TextElement.md).[getGlyph](TextElement.md#getglyph)

#### Defined in

[src/Document/TextElement.ts:107](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L107)

___

### getTextFromNode

▸ `Protected` **getTextFromNode**(`node?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `ChildNode` |

#### Returns

`string`

#### Inherited from

[TextElement](TextElement.md).[getTextFromNode](TextElement.md#gettextfromnode)

#### Defined in

[src/Document/TextElement.ts:149](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L149)

___

### renderTElementChildren

▸ `Protected` **renderTElementChildren**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Inherited from

[TextElement](TextElement.md).[renderTElementChildren](TextElement.md#rendertelementchildren)

#### Defined in

[src/Document/TextElement.ts:198](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L198)

___

### applyAnchoring

▸ `Protected` **applyAnchoring**(): `void`

#### Returns

`void`

#### Inherited from

[TextElement](TextElement.md).[applyAnchoring](TextElement.md#applyanchoring)

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

#### Inherited from

[TextElement](TextElement.md).[adjustChildCoordinatesRecursive](TextElement.md#adjustchildcoordinatesrecursive)

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

#### Inherited from

[TextElement](TextElement.md).[adjustChildCoordinatesRecursiveCore](TextElement.md#adjustchildcoordinatesrecursivecore)

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

#### Inherited from

[TextElement](TextElement.md).[adjustChildCoordinates](TextElement.md#adjustchildcoordinates)

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

#### Inherited from

[TextElement](TextElement.md).[getChildBoundingBox](TextElement.md#getchildboundingbox)

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

#### Inherited from

[TextElement](TextElement.md).[renderChild](TextElement.md#renderchild)

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

#### Inherited from

[TextElement](TextElement.md).[measureText](TextElement.md#measuretext)

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

#### Inherited from

[TextElement](TextElement.md).[measureTargetText](TextElement.md#measuretargettext)

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

#### Inherited from

[TextElement](TextElement.md).[getInheritedAttribute](TextElement.md#getinheritedattribute)

#### Defined in

[src/Document/TextElement.ts:544](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/TextElement.ts#L544)
