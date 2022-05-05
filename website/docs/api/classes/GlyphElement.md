---
id: "GlyphElement"
title: "Class: GlyphElement"
sidebar_label: "GlyphElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`PathElement`](PathElement.md)

  ↳ **`GlyphElement`**

  ↳↳ [`MissingGlyphElement`](MissingGlyphElement.md)

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[PathElement](PathElement.md).[ignoreChildTypes](PathElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[PathElement](PathElement.md).[attributes](PathElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[PathElement](PathElement.md).[styles](PathElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[PathElement](PathElement.md).[stylesSpecificity](PathElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[PathElement](PathElement.md).[animationFrozen](PathElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[PathElement](PathElement.md).[animationFrozenValue](PathElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[PathElement](PathElement.md).[parent](PathElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[PathElement](PathElement.md).[children](PathElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[PathElement](PathElement.md).[document](PathElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[PathElement](PathElement.md).[node](PathElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[PathElement](PathElement.md).[captureTextNodes](PathElement.md#capturetextnodes)

___

### type

• **type**: `string` = `'glyph'`

#### Overrides

[PathElement](PathElement.md).[type](PathElement.md#type)

#### Defined in

[src/Document/GlyphElement.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GlyphElement.ts#L7)

___

### horizAdvX

• `Readonly` **horizAdvX**: `number`

#### Defined in

[src/Document/GlyphElement.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GlyphElement.ts#L8)

___

### unicode

• `Readonly` **unicode**: `string`

#### Defined in

[src/Document/GlyphElement.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GlyphElement.ts#L9)

___

### arabicForm

• `Readonly` **arabicForm**: `ArabicForm`

#### Defined in

[src/Document/GlyphElement.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GlyphElement.ts#L10)

___

### pathParser

• `Readonly` **pathParser**: [`PathParser`](PathParser.md)

#### Inherited from

[PathElement](PathElement.md).[pathParser](PathElement.md#pathparser)

#### Defined in

[src/Document/PathElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L18)

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

[PathElement](PathElement.md).[getAttribute](PathElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[PathElement](PathElement.md).[getHrefAttribute](PathElement.md#gethrefattribute)

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

[PathElement](PathElement.md).[getStyle](PathElement.md#getstyle)

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

[PathElement](PathElement.md).[render](PathElement.md#render)

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

[PathElement](PathElement.md).[applyEffects](PathElement.md#applyeffects)

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

[PathElement](PathElement.md).[addChild](PathElement.md#addchild)

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

[PathElement](PathElement.md).[matchesSelector](PathElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[addStylesFromStyleDefinition](PathElement.md#addstylesfromstyledefinition)

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

[PathElement](PathElement.md).[removeStyles](PathElement.md#removestyles)

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

[PathElement](PathElement.md).[restoreStyles](PathElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[PathElement](PathElement.md).[isFirstChild](PathElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

___

### path

▸ **path**(`ctx?`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx?` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Inherited from

[PathElement](PathElement.md).[path](PathElement.md#path)

#### Defined in

[src/Document/PathElement.ts:30](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L30)

___

### getBoundingBox

▸ **getBoundingBox**(`_ctx`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Inherited from

[PathElement](PathElement.md).[getBoundingBox](PathElement.md#getboundingbox)

#### Defined in

[src/Document/PathElement.ts:89](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L89)

___

### getMarkers

▸ **getMarkers**(): `Marker`[]

#### Returns

`Marker`[]

#### Inherited from

[PathElement](PathElement.md).[getMarkers](PathElement.md#getmarkers)

#### Defined in

[src/Document/PathElement.ts:93](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L93)

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

[PathElement](PathElement.md).[renderChildren](PathElement.md#renderchildren)

#### Defined in

[src/Document/PathElement.ts:102](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L102)

___

### pathM

▸ `Static` **pathM**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `point` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathM](PathElement.md#pathm)

#### Defined in

[src/Document/PathElement.ts:161](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L161)

___

### pathM

▸ `Protected` **pathM**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathM](PathElement.md#pathm-1)

#### Defined in

[src/Document/PathElement.ts:171](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L171)

___

### pathL

▸ `Static` **pathL**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `point` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathL](PathElement.md#pathl)

#### Defined in

[src/Document/PathElement.ts:190](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L190)

___

### pathL

▸ `Protected` **pathL**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathL](PathElement.md#pathl-1)

#### Defined in

[src/Document/PathElement.ts:200](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L200)

___

### pathH

▸ `Static` **pathH**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `point` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathH](PathElement.md#pathh)

#### Defined in

[src/Document/PathElement.ts:222](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L222)

___

### pathH

▸ `Protected` **pathH**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathH](PathElement.md#pathh-1)

#### Defined in

[src/Document/PathElement.ts:240](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L240)

___

### pathV

▸ `Static` **pathV**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `point` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathV](PathElement.md#pathv)

#### Defined in

[src/Document/PathElement.ts:262](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L262)

___

### pathV

▸ `Protected` **pathV**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathV](PathElement.md#pathv-1)

#### Defined in

[src/Document/PathElement.ts:280](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L280)

___

### pathC

▸ `Static` **pathC**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `point` | [`Point`](Point.md) |
| `controlPoint` | [`Point`](Point.md) |
| `currentPoint` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathC](PathElement.md#pathc)

#### Defined in

[src/Document/PathElement.ts:302](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L302)

___

### pathC

▸ `Protected` **pathC**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathC](PathElement.md#pathc-1)

#### Defined in

[src/Document/PathElement.ts:316](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L316)

___

### pathS

▸ `Static` **pathS**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `point` | [`Point`](Point.md) |
| `controlPoint` | [`Point`](Point.md) |
| `currentPoint` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathS](PathElement.md#paths)

#### Defined in

[src/Document/PathElement.ts:352](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L352)

___

### pathS

▸ `Protected` **pathS**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathS](PathElement.md#paths-1)

#### Defined in

[src/Document/PathElement.ts:366](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L366)

___

### pathQ

▸ `Static` **pathQ**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `controlPoint` | [`Point`](Point.md) |
| `currentPoint` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathQ](PathElement.md#pathq)

#### Defined in

[src/Document/PathElement.ts:402](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L402)

___

### pathQ

▸ `Protected` **pathQ**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathQ](PathElement.md#pathq-1)

#### Defined in

[src/Document/PathElement.ts:414](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L414)

___

### pathT

▸ `Static` **pathT**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `current` | [`Point`](Point.md) |
| `controlPoint` | [`Point`](Point.md) |
| `currentPoint` | [`Point`](Point.md) |

#### Inherited from

[PathElement](PathElement.md).[pathT](PathElement.md#patht)

#### Defined in

[src/Document/PathElement.ts:445](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L445)

___

### pathT

▸ `Protected` **pathT**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathT](PathElement.md#patht-1)

#### Defined in

[src/Document/PathElement.ts:460](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L460)

___

### pathA

▸ `Static` **pathA**(`pathParser`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `currentPoint` | [`Point`](Point.md) |
| `rX` | `number` |
| `rY` | `number` |
| `sweepFlag` | ``0`` \| ``1`` |
| `xAxisRotation` | `number` |
| `centp` | [`Point`](Point.md) |
| `a1` | `number` |
| `ad` | `number` |

#### Inherited from

[PathElement](PathElement.md).[pathA](PathElement.md#patha)

#### Defined in

[src/Document/PathElement.ts:491](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L491)

___

### pathA

▸ `Protected` **pathA**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathA](PathElement.md#patha-1)

#### Defined in

[src/Document/PathElement.ts:580](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L580)

___

### pathZ

▸ `Static` **pathZ**(`pathParser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathParser` | [`PathParser`](PathParser.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathZ](PathElement.md#pathz)

#### Defined in

[src/Document/PathElement.ts:622](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L622)

___

### pathZ

▸ `Protected` **pathZ**(`ctx`, `boundingBox`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `boundingBox` | [`BoundingBox`](BoundingBox.md) |

#### Returns

`void`

#### Inherited from

[PathElement](PathElement.md).[pathZ](PathElement.md#pathz-1)

#### Defined in

[src/Document/PathElement.ts:626](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L626)

___

### calculateOpacity

▸ `Protected` **calculateOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[PathElement](PathElement.md).[calculateOpacity](PathElement.md#calculateopacity)

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

[PathElement](PathElement.md).[setContext](PathElement.md#setcontext)

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

[PathElement](PathElement.md).[clearContext](PathElement.md#clearcontext)

#### Defined in

[src/Document/RenderedElement.ts:215](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L215)

## Constructors

### constructor

• **new GlyphElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[PathElement](PathElement.md).[constructor](PathElement.md#constructor)

#### Defined in

[src/Document/GlyphElement.ts:12](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GlyphElement.ts#L12)
