---
id: "IOptions"
title: "Interface: IOptions"
sidebar_label: "IOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`IParserOptions`](IParserOptions.md)

- [`IScreenOptions`](IScreenOptions.md)

- [`IScreenStartOptions`](IScreenStartOptions.md)

- [`IDocumentOptions`](IDocumentOptions.md)

  ↳ **`IOptions`**

## Properties

### rootEmSize

• `Optional` **rootEmSize**: `number`

Default `rem` size.

#### Inherited from

[IDocumentOptions](IDocumentOptions.md).[rootEmSize](IDocumentOptions.md#rootemsize)

#### Defined in

[src/Document/Document.ts:30](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L30)

___

### emSize

• `Optional` **emSize**: `number`

Default `em` size.

#### Inherited from

[IDocumentOptions](IDocumentOptions.md).[emSize](IDocumentOptions.md#emsize)

#### Defined in

[src/Document/Document.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L34)

___

### createCanvas

• `Optional` **createCanvas**: [`CreateCanvas`](../#createcanvas)

Function to create new canvas.

#### Inherited from

[IDocumentOptions](IDocumentOptions.md).[createCanvas](IDocumentOptions.md#createcanvas)

#### Defined in

[src/Document/Document.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L38)

___

### createImage

• `Optional` **createImage**: [`CreateImage`](../#createimage)

Function to create new image.

#### Inherited from

[IDocumentOptions](IDocumentOptions.md).[createImage](IDocumentOptions.md#createimage)

#### Defined in

[src/Document/Document.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L42)

___

### anonymousCrossOrigin

• `Optional` **anonymousCrossOrigin**: `boolean`

Load images anonymously.

#### Inherited from

[IDocumentOptions](IDocumentOptions.md).[anonymousCrossOrigin](IDocumentOptions.md#anonymouscrossorigin)

#### Defined in

[src/Document/Document.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L46)

___

### fetch

• `Optional` **fetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

WHATWG-compatible `fetch` function.

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Inherited from

[IScreenOptions](IScreenOptions.md).[fetch](IScreenOptions.md#fetch)

#### Defined in

[src/Parser.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L10)

___

### DOMParser

• `Optional` **DOMParser**: `Object`

XML/HTML parser from string into DOM Document.

#### Inherited from

[IParserOptions](IParserOptions.md).[DOMParser](IParserOptions.md#domparser)

#### Defined in

[src/Parser.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L14)

___

### window

• `Optional` **window**: `Window`

Window object.

#### Inherited from

[IScreenOptions](IScreenOptions.md).[window](IScreenOptions.md#window)

#### Defined in

[src/Screen.ts:23](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L23)

___

### enableRedraw

• `Optional` **enableRedraw**: `boolean`

Whether enable the redraw.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[enableRedraw](IScreenStartOptions.md#enableredraw)

#### Defined in

[src/Screen.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L34)

___

### ignoreMouse

• `Optional` **ignoreMouse**: `boolean`

Ignore mouse events.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[ignoreMouse](IScreenStartOptions.md#ignoremouse)

#### Defined in

[src/Screen.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L38)

___

### ignoreAnimation

• `Optional` **ignoreAnimation**: `boolean`

Ignore animations.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[ignoreAnimation](IScreenStartOptions.md#ignoreanimation)

#### Defined in

[src/Screen.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L42)

___

### ignoreDimensions

• `Optional` **ignoreDimensions**: `boolean`

Does not try to resize canvas.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[ignoreDimensions](IScreenStartOptions.md#ignoredimensions)

#### Defined in

[src/Screen.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L46)

___

### ignoreClear

• `Optional` **ignoreClear**: `boolean`

Does not clear canvas.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[ignoreClear](IScreenStartOptions.md#ignoreclear)

#### Defined in

[src/Screen.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L50)

___

### scaleWidth

• `Optional` **scaleWidth**: `number`

Scales horizontally to width.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[scaleWidth](IScreenStartOptions.md#scalewidth)

#### Defined in

[src/Screen.ts:54](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L54)

___

### scaleHeight

• `Optional` **scaleHeight**: `number`

Scales vertically to height.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[scaleHeight](IScreenStartOptions.md#scaleheight)

#### Defined in

[src/Screen.ts:58](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L58)

___

### offsetX

• `Optional` **offsetX**: `number`

Draws at a x offset.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[offsetX](IScreenStartOptions.md#offsetx)

#### Defined in

[src/Screen.ts:62](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L62)

___

### offsetY

• `Optional` **offsetY**: `number`

Draws at a y offset.

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[offsetY](IScreenStartOptions.md#offsety)

#### Defined in

[src/Screen.ts:66](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L66)

## Methods

### forceRedraw

▸ `Optional` **forceRedraw**(): `boolean`

Will call the function on every frame, if it returns true, will redraw.

#### Returns

`boolean`

#### Inherited from

[IScreenStartOptions](IScreenStartOptions.md).[forceRedraw](IScreenStartOptions.md#forceredraw)

#### Defined in

[src/Screen.ts:70](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L70)
