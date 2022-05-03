---
id: "GradientElement"
title: "Class: GradientElement"
sidebar_label: "GradientElement"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Element`](Element.md)

  ↳ **`GradientElement`**

  ↳↳ [`LinearGradientElement`](LinearGradientElement.md)

  ↳↳ [`RadialGradientElement`](RadialGradientElement.md)

## Properties

### ignoreChildTypes

▪ `Static` `Readonly` **ignoreChildTypes**: `string`[]

#### Inherited from

[Element](Element.md).[ignoreChildTypes](Element.md#ignorechildtypes)

#### Defined in

[src/Document/Element.ts:11](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L11)

___

### type

• `Readonly` **type**: `string` = `''`

#### Inherited from

[Element](Element.md).[type](Element.md#type)

#### Defined in

[src/Document/Element.ts:13](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L13)

___

### attributes

• `Readonly` **attributes**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[Element](Element.md).[attributes](Element.md#attributes)

#### Defined in

[src/Document/Element.ts:14](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L14)

___

### styles

• `Readonly` **styles**: `Record`<`string`, [`Property`](Property.md)<`unknown`\>\> = `{}`

#### Inherited from

[Element](Element.md).[styles](Element.md#styles)

#### Defined in

[src/Document/Element.ts:15](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L15)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Inherited from

[Element](Element.md).[stylesSpecificity](Element.md#stylesspecificity)

#### Defined in

[src/Document/Element.ts:16](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L16)

___

### animationFrozen

• **animationFrozen**: `boolean` = `false`

#### Inherited from

[Element](Element.md).[animationFrozen](Element.md#animationfrozen)

#### Defined in

[src/Document/Element.ts:17](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L17)

___

### animationFrozenValue

• **animationFrozenValue**: `string` = `''`

#### Inherited from

[Element](Element.md).[animationFrozenValue](Element.md#animationfrozenvalue)

#### Defined in

[src/Document/Element.ts:18](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L18)

___

### parent

• **parent**: [`Element`](Element.md) = `null`

#### Inherited from

[Element](Element.md).[parent](Element.md#parent)

#### Defined in

[src/Document/Element.ts:19](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L19)

___

### children

• **children**: [`Element`](Element.md)[] = `[]`

#### Inherited from

[Element](Element.md).[children](Element.md#children)

#### Defined in

[src/Document/Element.ts:20](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L20)

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

___

### attributesToInherit

• `Readonly` **attributesToInherit**: `string`[]

#### Defined in

[src/Document/GradientElement.ts:13](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L13)

___

### stops

• `Protected` `Readonly` **stops**: [`StopElement`](StopElement.md)[] = `[]`

#### Defined in

[src/Document/GradientElement.ts:15](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L15)

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

[Element](Element.md).[getAttribute](Element.md#getattribute)

#### Defined in

[src/Document/Element.ts:87](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L87)

___

### getHrefAttribute

▸ **getHrefAttribute**(): [`Property`](Property.md)<`unknown`\>

#### Returns

[`Property`](Property.md)<`unknown`\>

#### Inherited from

[Element](Element.md).[getHrefAttribute](Element.md#gethrefattribute)

#### Defined in

[src/Document/Element.ts:101](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L101)

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

[src/Document/Element.ts:114](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L114)

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

[src/Document/Element.ts:151](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L151)

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

[src/Document/Element.ts:186](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L186)

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

[src/Document/Element.ts:190](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L190)

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

[src/Document/Element.ts:210](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L210)

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

[src/Document/Element.ts:214](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L214)

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

[src/Document/Element.ts:220](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L220)

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

[src/Document/Element.ts:232](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L232)

___

### addStylesFromStyleDefinition

▸ **addStylesFromStyleDefinition**(): `void`

#### Returns

`void`

#### Inherited from

[Element](Element.md).[addStylesFromStyleDefinition](Element.md#addstylesfromstyledefinition)

#### Defined in

[src/Document/Element.ts:248](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L248)

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

[src/Document/Element.ts:283](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L283)

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

[src/Document/Element.ts:301](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L301)

___

### isFirstChild

▸ **isFirstChild**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Element](Element.md).[isFirstChild](Element.md#isfirstchild)

#### Defined in

[src/Document/Element.ts:307](https://github.com/canvg/canvg/blob/5ea8056/src/Document/Element.ts#L307)

___

### getGradient

▸ `Abstract` **getGradient**(`ctx`, `element`): `CanvasGradient`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `element` | [`PathElement`](PathElement.md) |

#### Returns

`CanvasGradient`

#### Defined in

[src/Document/GradientElement.ts:36](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L36)

___

### getGradientUnits

▸ **getGradientUnits**(): `string`

#### Returns

`string`

#### Defined in

[src/Document/GradientElement.ts:38](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L38)

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

#### Defined in

[src/Document/GradientElement.ts:42](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L42)

___

### inheritStopContainer

▸ `Protected` **inheritStopContainer**(`stopsContainer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stopsContainer` | [`Element`](Element.md) |

#### Returns

`void`

#### Defined in

[src/Document/GradientElement.ts:149](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L149)

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

#### Defined in

[src/Document/GradientElement.ts:160](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L160)

## Constructors

### constructor

• **new GradientElement**(`document`, `node`, `captureTextNodes?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | [`Document`](Document.md) |
| `node` | `HTMLElement` |
| `captureTextNodes?` | `boolean` |

#### Overrides

[Element](Element.md).[constructor](Element.md#constructor)

#### Defined in

[src/Document/GradientElement.ts:17](https://github.com/canvg/canvg/blob/5ea8056/src/Document/GradientElement.ts#L17)