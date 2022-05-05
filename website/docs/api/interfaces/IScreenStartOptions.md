---
id: "IScreenStartOptions"
title: "Interface: IScreenStartOptions"
sidebar_label: "IScreenStartOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`IScreenStartOptions`**

  ↳ [`IOptions`](IOptions.md)

## Properties

### enableRedraw

• `Optional` **enableRedraw**: `boolean`

Whether enable the redraw.

#### Defined in

[src/Screen.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L34)

___

### ignoreMouse

• `Optional` **ignoreMouse**: `boolean`

Ignore mouse events.

#### Defined in

[src/Screen.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L38)

___

### ignoreAnimation

• `Optional` **ignoreAnimation**: `boolean`

Ignore animations.

#### Defined in

[src/Screen.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L42)

___

### ignoreDimensions

• `Optional` **ignoreDimensions**: `boolean`

Does not try to resize canvas.

#### Defined in

[src/Screen.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L46)

___

### ignoreClear

• `Optional` **ignoreClear**: `boolean`

Does not clear canvas.

#### Defined in

[src/Screen.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L50)

___

### scaleWidth

• `Optional` **scaleWidth**: `number`

Scales horizontally to width.

#### Defined in

[src/Screen.ts:54](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L54)

___

### scaleHeight

• `Optional` **scaleHeight**: `number`

Scales vertically to height.

#### Defined in

[src/Screen.ts:58](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L58)

___

### offsetX

• `Optional` **offsetX**: `number`

Draws at a x offset.

#### Defined in

[src/Screen.ts:62](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L62)

___

### offsetY

• `Optional` **offsetY**: `number`

Draws at a y offset.

#### Defined in

[src/Screen.ts:66](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L66)

## Methods

### forceRedraw

▸ `Optional` **forceRedraw**(): `boolean`

Will call the function on every frame, if it returns true, will redraw.

#### Returns

`boolean`

#### Defined in

[src/Screen.ts:70](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L70)
