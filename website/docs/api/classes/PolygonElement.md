---
id: "PolygonElement"
title: "Class: PolygonElement"
sidebar_label: "PolygonElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`PolylineElement`](PolylineElement.md)

  ↳ **`PolygonElement`**

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[PolylineElement](PolylineElement.md).[ignoreChildTypes](PolylineElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[PolylineElement](PolylineElement.md).[attributes](PolylineElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[PolylineElement](PolylineElement.md).[styles](PolylineElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[PolylineElement](PolylineElement.md).[stylesSpecificity](PolylineElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[PolylineElement](PolylineElement.md).[animationFrozen](PolylineElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[PolylineElement](PolylineElement.md).[animationFrozenValue](PolylineElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[PolylineElement](PolylineElement.md).[parent](PolylineElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[PolylineElement](PolylineElement.md).[children](PolylineElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[PolylineElement](PolylineElement.md).[document](PolylineElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[PolylineElement](PolylineElement.md).[node](PolylineElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[PolylineElement](PolylineElement.md).[captureTextNodes](PolylineElement.md#capturetextnodes)

___

### pathParser

• `Readonly` **pathParser**: [`PathParser`](PathParser.md)

#### Inherited from

[PolylineElement](PolylineElement.md).[pathParser](PolylineElement.md#pathparser)

#### Defined in

[src/Document/PathElement.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L18)

___

### type

• **type**: `string` = `'polygon'`

#### Overrides

[PolylineElement](PolylineElement.md).[type](PolylineElement.md#type)

#### Defined in

[src/Document/PolygonElement.ts:5](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PolygonElement.ts#L5)

___

### points

• `Protected` `Readonly` **points**: [`Point`](Point.md)[] = `[]`

#### Inherited from

[PolylineElement](PolylineElement.md).[points](PolylineElement.md#points)

#### Defined in

[src/Document/PolylineElement.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PolylineElement.ts#L9)

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

[PolylineElement](PolylineElement.md).[getAttribute](PolylineElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[PolylineElement](PolylineElement.md).[getHrefAttribute](PolylineElement.md#gethrefattribute)

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

[PolylineElement](PolylineElement.md).[getStyle](PolylineElement.md#getstyle)

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

[PolylineElement](PolylineElement.md).[render](PolylineElement.md#render)

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

[PolylineElement](PolylineElement.md).[applyEffects](PolylineElement.md#applyeffects)

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

[PolylineElement](PolylineElement.md).[addChild](PolylineElement.md#addchild)

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

[PolylineElement](PolylineElement.md).[matchesSelector](PolylineElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[PolylineElement](PolylineElement.md).[addStylesFromStyleDefinition](PolylineElement.md#addstylesfromstyledefinition)

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

[PolylineElement](PolylineElement.md).[removeStyles](PolylineElement.md#removestyles)

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

[PolylineElement](PolylineElement.md).[restoreStyles](PolylineElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[PolylineElement](PolylineElement.md).[isFirstChild](PolylineElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

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

[PolylineElement](PolylineElement.md).[getBoundingBox](PolylineElement.md#getboundingbox)

#### Defined in

[src/Document/PathElement.ts:89](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L89)

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

[PolylineElement](PolylineElement.md).[renderChildren](PolylineElement.md#renderchildren)

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

[PolylineElement](PolylineElement.md).[pathM](PolylineElement.md#pathm)

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

[PolylineElement](PolylineElement.md).[pathM](PolylineElement.md#pathm-1)

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

[PolylineElement](PolylineElement.md).[pathL](PolylineElement.md#pathl)

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

[PolylineElement](PolylineElement.md).[pathL](PolylineElement.md#pathl-1)

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

[PolylineElement](PolylineElement.md).[pathH](PolylineElement.md#pathh)

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

[PolylineElement](PolylineElement.md).[pathH](PolylineElement.md#pathh-1)

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

[PolylineElement](PolylineElement.md).[pathV](PolylineElement.md#pathv)

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

[PolylineElement](PolylineElement.md).[pathV](PolylineElement.md#pathv-1)

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

[PolylineElement](PolylineElement.md).[pathC](PolylineElement.md#pathc)

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

[PolylineElement](PolylineElement.md).[pathC](PolylineElement.md#pathc-1)

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

[PolylineElement](PolylineElement.md).[pathS](PolylineElement.md#paths)

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

[PolylineElement](PolylineElement.md).[pathS](PolylineElement.md#paths-1)

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

[PolylineElement](PolylineElement.md).[pathQ](PolylineElement.md#pathq)

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

[PolylineElement](PolylineElement.md).[pathQ](PolylineElement.md#pathq-1)

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

[PolylineElement](PolylineElement.md).[pathT](PolylineElement.md#patht)

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

[PolylineElement](PolylineElement.md).[pathT](PolylineElement.md#patht-1)

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

[PolylineElement](PolylineElement.md).[pathA](PolylineElement.md#patha)

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

[PolylineElement](PolylineElement.md).[pathA](PolylineElement.md#patha-1)

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

[PolylineElement](PolylineElement.md).[pathZ](PolylineElement.md#pathz)

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

[PolylineElement](PolylineElement.md).[pathZ](PolylineElement.md#pathz-1)

#### Defined in

[src/Document/PathElement.ts:626](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PathElement.ts#L626)

___

### path

▸ **path**(`ctx`): [`BoundingBox`](BoundingBox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

[`BoundingBox`](BoundingBox.md)

#### Overrides

[PolylineElement](PolylineElement.md).[path](PolylineElement.md#path)

#### Defined in

[src/Document/PolygonElement.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PolygonElement.ts#L7)

___

### getMarkers

▸ **getMarkers**(): `Marker`[]

#### Returns

`Marker`[]

#### Inherited from

[PolylineElement](PolylineElement.md).[getMarkers](PolylineElement.md#getmarkers)

#### Defined in

[src/Document/PolylineElement.ts:52](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PolylineElement.ts#L52)

___

### calculateOpacity

▸ `Protected` **calculateOpacity**(): `number`

#### Returns

`number`

#### Inherited from

[PolylineElement](PolylineElement.md).[calculateOpacity](PolylineElement.md#calculateopacity)

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

[PolylineElement](PolylineElement.md).[setContext](PolylineElement.md#setcontext)

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

[PolylineElement](PolylineElement.md).[clearContext](PolylineElement.md#clearcontext)

#### Defined in

[src/Document/RenderedElement.ts:215](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RenderedElement.ts#L215)

## Constructors

### constructor

• **new PolygonElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Inherited from

[PolylineElement](PolylineElement.md).[constructor](PolylineElement.md#constructor)

#### Defined in

[src/Document/PolylineElement.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/PolylineElement.ts#L11)
