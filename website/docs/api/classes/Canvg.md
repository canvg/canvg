---
id: "Canvg"
title: "Class: Canvg"
sidebar_label: "Canvg"
sidebar_position: 0
custom_edit_url: null
---

SVG renderer on canvas.

## Methods

### from

▸ `Static` **from**(`ctx`, `svg`, `options?`): `Promise`<[`Canvg`](Canvg.md)\>

Create Canvg instance from SVG source string or URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | Rendering context. |
| `svg` | `string` | SVG source string or URL. |
| `options` | [`IOptions`](../interfaces/IOptions.md) | Rendering options. |

#### Returns

`Promise`<[`Canvg`](Canvg.md)\>

Canvg instance.

#### Defined in

[src/Canvg.ts:32](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L32)

___

### fromString

▸ `Static` **fromString**(`ctx`, `svg`, `options?`): [`Canvg`](Canvg.md)

Create Canvg instance from SVG source string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | Rendering context. |
| `svg` | `string` | SVG source string. |
| `options` | [`IOptions`](../interfaces/IOptions.md) | Rendering options. |

#### Returns

[`Canvg`](Canvg.md)

Canvg instance.

#### Defined in

[src/Canvg.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L50)

___

### fork

▸ **fork**(`ctx`, `svg`, `options?`): `Promise`<[`Canvg`](Canvg.md)\>

Create new Canvg instance with inherited options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | Rendering context. |
| `svg` | `string` | SVG source string or URL. |
| `options` | [`IOptions`](../interfaces/IOptions.md) | Rendering options. |

#### Returns

`Promise`<[`Canvg`](Canvg.md)\>

Canvg instance.

#### Defined in

[src/Canvg.ts:105](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L105)

___

### forkString

▸ **forkString**(`ctx`, `svg`, `options?`): [`Canvg`](Canvg.md)

Create new Canvg instance with inherited options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | Rendering context. |
| `svg` | `string` | SVG source string. |
| `options` | [`IOptions`](../interfaces/IOptions.md) | Rendering options. |

#### Returns

[`Canvg`](Canvg.md)

Canvg instance.

#### Defined in

[src/Canvg.ts:123](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L123)

___

### ready

▸ **ready**(): `Promise`<`void`\>

Document is ready promise.

#### Returns

`Promise`<`void`\>

Ready promise.

#### Defined in

[src/Canvg.ts:138](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L138)

___

### isReady

▸ **isReady**(): `boolean`

Document is ready value.

#### Returns

`boolean`

Is ready or not.

#### Defined in

[src/Canvg.ts:146](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L146)

___

### render

▸ **render**(`options?`): `Promise`<`void`\>

Render only first frame, ignoring animations and mouse.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IScreenStartOptions`](../interfaces/IScreenStartOptions.md) | Rendering options. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Canvg.ts:154](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L154)

___

### start

▸ **start**(`options?`): `void`

Start rendering.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IScreenStartOptions`](../interfaces/IScreenStartOptions.md) | Render options. |

#### Returns

`void`

#### Defined in

[src/Canvg.ts:171](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L171)

___

### stop

▸ **stop**(): `void`

Stop rendering.

#### Returns

`void`

#### Defined in

[src/Canvg.ts:188](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L188)

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

[src/Canvg.ts:198](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L198)

## Properties

### parser

• `Readonly` **parser**: [`Parser`](Parser.md)

XML/HTML parser instance.

#### Defined in

[src/Canvg.ts:64](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L64)

___

### screen

• `Readonly` **screen**: [`Screen`](Screen.md)

Screen instance.

#### Defined in

[src/Canvg.ts:68](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L68)

___

### document

• `Readonly` **document**: [`Document`](Document.md)

Canvg Document.

#### Defined in

[src/Canvg.ts:72](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L72)

___

### documentElement

• `Private` `Readonly` **documentElement**: [`SVGElement`](SVGElement.md)

#### Defined in

[src/Canvg.ts:73](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L73)

___

### options

• `Private` `Readonly` **options**: [`IOptions`](../interfaces/IOptions.md)

#### Defined in

[src/Canvg.ts:74](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L74)

## Constructors

### constructor

• **new Canvg**(`ctx`, `svg`, `options?`)

Main constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) | Rendering context. |
| `svg` | `Document` | SVG Document. |
| `options` | [`IOptions`](../interfaces/IOptions.md) | Rendering options. |

#### Defined in

[src/Canvg.ts:82](https://github.com/canvg/canvg/blob/5c58ee8/src/Canvg.ts#L82)
