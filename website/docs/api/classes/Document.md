---
id: "Document"
title: "Class: Document"
sidebar_label: "Document"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### createCanvas

▪ `Static` `Readonly` **createCanvas**: (`width`: `number`, `height`: `number`) => `HTMLCanvasElement` = `createCanvas`

#### Type declaration

▸ (`width`, `height`): `HTMLCanvasElement`

##### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

##### Returns

`HTMLCanvasElement`

#### Defined in

[src/Document/Document.ts:85](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L85)

___

### createImage

▪ `Static` `Readonly` **createImage**: (`src`: `string`, `anonymousCrossOrigin`: `boolean`) => `Promise`<`HTMLImageElement`\> = `createImage`

#### Type declaration

▸ (`src`, `anonymousCrossOrigin?`): `Promise`<`HTMLImageElement`\>

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `src` | `string` | `undefined` |
| `anonymousCrossOrigin` | `boolean` | `false` |

##### Returns

`Promise`<`HTMLImageElement`\>

#### Defined in

[src/Document/Document.ts:86](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L86)

___

### elementTypes

▪ `Static` `Readonly` **elementTypes**: `Record`<`string`, [`AnyElement`](../#anyelement)\> = `elementTypes`

#### Defined in

[src/Document/Document.ts:87](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L87)

___

### rootEmSize

• **rootEmSize**: `number`

#### Defined in

[src/Document/Document.ts:89](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L89)

___

### documentElement

• `Optional` **documentElement**: [`SVGElement`](SVGElement.md)

#### Defined in

[src/Document/Document.ts:90](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L90)

___

### screen

• `Readonly` **screen**: [`Screen`](Screen.md)

#### Defined in

[src/Document/Document.ts:91](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L91)

___

### createCanvas

• `Readonly` **createCanvas**: [`CreateCanvas`](../#createcanvas)

#### Defined in

[src/Document/Document.ts:92](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L92)

___

### createImage

• `Readonly` **createImage**: [`CreateImage`](../#createimage)

#### Defined in

[src/Document/Document.ts:93](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L93)

___

### definitions

• `Readonly` **definitions**: `Record`<`string`, [`Element`](Element.md)\> = `{}`

#### Defined in

[src/Document/Document.ts:94](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L94)

___

### styles

• `Readonly` **styles**: `Record`<`string`, `Record`<`string`, [`Property`](Property.md)<`unknown`\>\>\> = `{}`

#### Defined in

[src/Document/Document.ts:95](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L95)

___

### stylesSpecificity

• `Readonly` **stylesSpecificity**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/Document/Document.ts:96](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L96)

___

### images

• `Readonly` **images**: [`ImageElement`](ImageElement.md)[] = `[]`

#### Defined in

[src/Document/Document.ts:97](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L97)

___

### fonts

• `Readonly` **fonts**: [`SVGFontLoader`](SVGFontLoader.md)[] = `[]`

#### Defined in

[src/Document/Document.ts:98](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L98)

___

### emSizeStack

• `Private` `Readonly` **emSizeStack**: `number`[] = `[]`

#### Defined in

[src/Document/Document.ts:99](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L99)

___

### uniqueId

• `Private` **uniqueId**: `number` = `0`

#### Defined in

[src/Document/Document.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L100)

___

### canvg

• `Readonly` **canvg**: [`Canvg`](Canvg.md)

## Constructors

### constructor

• **new Document**(`canvg`, `__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvg` | [`Canvg`](Canvg.md) |
| `__namedParameters` | [`IDocumentOptions`](../interfaces/IDocumentOptions.md) |

#### Defined in

[src/Document/Document.ts:102](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L102)

## Methods

### bindCreateImage

▸ `Private` **bindCreateImage**(`createImage`, `anonymousCrossOrigin?`): [`CreateImage`](../#createimage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `createImage` | [`CreateImage`](../#createimage) |
| `anonymousCrossOrigin?` | `boolean` |

#### Returns

[`CreateImage`](../#createimage)

#### Defined in

[src/Document/Document.ts:122](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L122)

___

### popEmSize

▸ **popEmSize**(): `void`

#### Returns

`void`

#### Defined in

[src/Document/Document.ts:159](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L159)

___

### getUniqueId

▸ **getUniqueId**(): `string`

#### Returns

`string`

#### Defined in

[src/Document/Document.ts:165](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L165)

___

### isImagesLoaded

▸ **isImagesLoaded**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Document/Document.ts:169](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L169)

___

### isFontsLoaded

▸ **isFontsLoaded**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Document/Document.ts:173](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L173)

___

### createDocumentElement

▸ **createDocumentElement**(`document`): [`SVGElement`](SVGElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |

#### Returns

[`SVGElement`](SVGElement.md)

#### Defined in

[src/Document/Document.ts:177](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L177)

___

### createElement

▸ **createElement**<`T`\>(`node`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Element`](Element.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `HTMLElement` |

#### Returns

`T`

#### Defined in

[src/Document/Document.ts:188](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L188)

___

### createTextNode

▸ **createTextNode**(`node`): `TextNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `HTMLElement` |

#### Returns

`TextNode`

#### Defined in

[src/Document/Document.ts:199](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L199)

___

### setViewBox

▸ **setViewBox**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IViewBoxConfig`](../#iviewboxconfig) |

#### Returns

`void`

#### Defined in

[src/Document/Document.ts:203](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L203)

## Accessors

### window

• `get` **window**(): `Window`

#### Returns

`Window`

#### Defined in

[src/Document/Document.ts:135](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L135)

___

### fetch

• `get` **fetch**(): (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Returns

`fn`

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/Document/Document.ts:139](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L139)

___

### ctx

• `get` **ctx**(): [`RenderingContext2D`](../#renderingcontext2d)

#### Returns

[`RenderingContext2D`](../#renderingcontext2d)

#### Defined in

[src/Document/Document.ts:143](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L143)

___

### emSize

• `get` **emSize**(): `number`

#### Returns

`number`

#### Defined in

[src/Document/Document.ts:147](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L147)

• `set` **emSize**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[src/Document/Document.ts:153](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L153)
