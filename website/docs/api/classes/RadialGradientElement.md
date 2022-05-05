---
id: "RadialGradientElement"
title: "Class: RadialGradientElement"
sidebar_label: "RadialGradientElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`GradientElement`](GradientElement.md)

  ↳ **`RadialGradientElement`**

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[GradientElement](GradientElement.md).[ignoreChildTypes](GradientElement.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L11)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[GradientElement](GradientElement.md).[attributes](GradientElement.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[GradientElement](GradientElement.md).[styles](GradientElement.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[GradientElement](GradientElement.md).[stylesSpecificity](GradientElement.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[GradientElement](GradientElement.md).[animationFrozen](GradientElement.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[GradientElement](GradientElement.md).[animationFrozenValue](GradientElement.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[GradientElement](GradientElement.md).[parent](GradientElement.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[GradientElement](GradientElement.md).[children](GradientElement.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L20)

___

### document

• `Protected` `Readonly` **document**: [`Document`](Document.md)

#### Inherited from

[GradientElement](GradientElement.md).[document](GradientElement.md#document)

___

### node

• `Protected` `Optional` `Readonly` **node**: `HTMLElement`

#### Inherited from

[GradientElement](GradientElement.md).[node](GradientElement.md#node)

___

### captureTextNodes

• `Protected` `Readonly` **captureTextNodes**: `boolean` = `false`

#### Inherited from

[GradientElement](GradientElement.md).[captureTextNodes](GradientElement.md#capturetextnodes)

___

### attributesToInherit

• `Readonly` **attributesToInherit**: `string`[]

#### Inherited from

[GradientElement](GradientElement.md).[attributesToInherit](GradientElement.md#attributestoinherit)

#### Defined in

[src/Document/GradientElement.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L13)

___

### stops

• `Protected` `Readonly` **stops**: [`StopElement`](StopElement.md)[] = `[]`

#### Inherited from

[GradientElement](GradientElement.md).[stops](GradientElement.md#stops)

#### Defined in

[src/Document/GradientElement.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L15)

___

### type

• **type**: `string` = `'radialGradient'`

#### Overrides

[GradientElement](GradientElement.md).[type](GradientElement.md#type)

#### Defined in

[src/Document/RadialGradientElement.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RadialGradientElement.ts#L7)

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

[GradientElement](GradientElement.md).[getAttribute](GradientElement.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[GradientElement](GradientElement.md).[getHrefAttribute](GradientElement.md#gethrefattribute)

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

[GradientElement](GradientElement.md).[getStyle](GradientElement.md#getstyle)

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

[GradientElement](GradientElement.md).[render](GradientElement.md#render)

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

[GradientElement](GradientElement.md).[setContext](GradientElement.md#setcontext)

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

[GradientElement](GradientElement.md).[applyEffects](GradientElement.md#applyeffects)

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

[GradientElement](GradientElement.md).[clearContext](GradientElement.md#clearcontext)

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

[GradientElement](GradientElement.md).[renderChildren](GradientElement.md#renderchildren)

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

[GradientElement](GradientElement.md).[addChild](GradientElement.md#addchild)

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

[GradientElement](GradientElement.md).[matchesSelector](GradientElement.md#matchesselector)

#### Defined in

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[GradientElement](GradientElement.md).[addStylesFromStyleDefinition](GradientElement.md#addstylesfromstyledefinition)

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

[GradientElement](GradientElement.md).[removeStyles](GradientElement.md#removestyles)

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

[GradientElement](GradientElement.md).[restoreStyles](GradientElement.md#restorestyles)

#### Defined in

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[GradientElement](GradientElement.md).[isFirstChild](GradientElement.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Element.ts#L307)

___

### getGradientUnits

▸ **getGradientUnits**(): `string`

#### Returns

`string`

#### Inherited from

[GradientElement](GradientElement.md).[getGradientUnits](GradientElement.md#getgradientunits)

#### Defined in

[src/Document/GradientElement.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L38)

___

### createGradient

▸ **createGradient**(`ctx`, `element`, `parentOpacityProp`): `string` \| `CanvasGradient` \| `CanvasPattern`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `element` | [`PathElement`](PathElement.md) |
| `parentOpacityProp` | [`Property`](Property.md)<`unknown`\> |

#### Returns

`string` \| `CanvasGradient` \| `CanvasPattern`

#### Inherited from

[GradientElement](GradientElement.md).[createGradient](GradientElement.md#creategradient)

#### Defined in

[src/Document/GradientElement.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L42)

___

### inheritStopContainer

▸ `Protected` **inheritStopContainer**(`stopsContainer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stopsContainer` | [`Element`](Element.md) |

#### Returns

`void`

#### Inherited from

[GradientElement](GradientElement.md).[inheritStopContainer](GradientElement.md#inheritstopcontainer)

#### Defined in

[src/Document/GradientElement.ts:149](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L149)

___

### addParentOpacity

▸ `Protected` **addParentOpacity**(`parentOpacityProp`, `color`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentOpacityProp` | [`Property`](Property.md)<`unknown`\> |
| `color` | `string` |

#### Returns

`string`

#### Inherited from

[GradientElement](GradientElement.md).[addParentOpacity](GradientElement.md#addparentopacity)

#### Defined in

[src/Document/GradientElement.ts:160](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/GradientElement.ts#L160)

___

### getGradient

▸ **getGradient**(`ctx`, `element`): `CanvasGradient`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `element` | [`PathElement`](PathElement.md) |

#### Returns

`CanvasGradient`

#### Overrides

[GradientElement](GradientElement.md).[getGradient](GradientElement.md#getgradient)

#### Defined in

[src/Document/RadialGradientElement.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RadialGradientElement.ts#L26)

## Constructors

### constructor

• **new RadialGradientElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[GradientElement](GradientElement.md).[constructor](GradientElement.md#constructor)

#### Defined in

[src/Document/RadialGradientElement.ts:9](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/RadialGradientElement.ts#L9)
