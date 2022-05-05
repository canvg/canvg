---
id: "Screen"
title: "Class: Screen"
sidebar_label: "Screen"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### defaultWindow

▪ `Static` `Readonly` **defaultWindow**: `Window` & typeof `globalThis` = `defaultWindow`

#### Defined in

[src/Screen.ts:98](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L98)

___

### defaultFetch

▪ `Static` `Readonly` **defaultFetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\> = `defaultFetch`

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/Screen.ts:99](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L99)

___

### FRAMERATE

▪ `Static` **FRAMERATE**: `number` = `30`

#### Defined in

[src/Screen.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L100)

___

### MAX\_VIRTUAL\_PIXELS

▪ `Static` **MAX\_VIRTUAL\_PIXELS**: `number` = `30000`

#### Defined in

[src/Screen.ts:101](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L101)

___

### window

• `Readonly` **window**: `Window`

#### Defined in

[src/Screen.ts:103](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L103)

___

### fetch

• `Readonly` **fetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/Screen.ts:104](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L104)

___

### viewPort

• `Readonly` **viewPort**: [`ViewPort`](ViewPort.md)

#### Defined in

[src/Screen.ts:105](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L105)

___

### mouse

• `Readonly` **mouse**: [`Mouse`](Mouse.md)

#### Defined in

[src/Screen.ts:106](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L106)

___

### animations

• `Readonly` **animations**: [`AnimateElement`](AnimateElement.md)[] = `[]`

#### Defined in

[src/Screen.ts:107](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L107)

___

### readyPromise

• `Private` **readyPromise**: `Promise`<`void`\>

#### Defined in

[src/Screen.ts:108](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L108)

___

### resolveReady

• `Private` **resolveReady**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/Screen.ts:109](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L109)

___

### waits

• `Private` **waits**: () => `boolean`[] = `[]`

#### Defined in

[src/Screen.ts:110](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L110)

___

### frameDuration

• `Private` **frameDuration**: `number` = `0`

#### Defined in

[src/Screen.ts:111](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L111)

___

### isReadyLock

• `Private` **isReadyLock**: `boolean` = `false`

#### Defined in

[src/Screen.ts:112](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L112)

___

### isFirstRender

• `Private` **isFirstRender**: `boolean` = `true`

#### Defined in

[src/Screen.ts:113](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L113)

___

### intervalId

• `Private` **intervalId**: `number` = `null`

#### Defined in

[src/Screen.ts:114](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L114)

___

### ctx

• `Readonly` **ctx**: [`RenderingContext2D`](../#renderingcontext2d)

## Constructors

### constructor

• **new Screen**(`ctx`, `__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |
| `__namedParameters` | [`IScreenOptions`](../interfaces/IScreenOptions.md) |

#### Defined in

[src/Screen.ts:116](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L116)

## Methods

### wait

▸ **wait**(`checker`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `checker` | () => `boolean` |

#### Returns

`void`

#### Defined in

[src/Screen.ts:132](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L132)

___

### ready

▸ **ready**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Screen.ts:136](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L136)

___

### isReady

▸ **isReady**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/Screen.ts:145](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L145)

___

### setDefaults

▸ **setDefaults**(`ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RenderingContext2D`](../#renderingcontext2d) |

#### Returns

`void`

#### Defined in

[src/Screen.ts:165](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L165)

___

### setViewBox

▸ **setViewBox**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`IScreenViewBoxConfig`](../interfaces/IScreenViewBoxConfig.md) |

#### Returns

`void`

#### Defined in

[src/Screen.ts:173](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L173)

___

### start

▸ **start**(`element`, `__namedParameters?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `__namedParameters` | [`IScreenStartOptions`](../interfaces/IScreenStartOptions.md) |

#### Returns

`void`

#### Defined in

[src/Screen.ts:286](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L286)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[src/Screen.ts:362](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L362)

___

### shouldUpdate

▸ `Private` **shouldUpdate**(`ignoreAnimation`, `forceRedraw`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ignoreAnimation` | `boolean` |
| `forceRedraw` | () => `boolean` |

#### Returns

`boolean`

#### Defined in

[src/Screen.ts:371](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L371)

___

### render

▸ `Private` **render**(`element`, `ignoreDimensions`, `ignoreClear`, `scaleWidth`, `scaleHeight`, `offsetX`, `offsetY`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | [`Element`](Element.md) |
| `ignoreDimensions` | `boolean` |
| `ignoreClear` | `boolean` |
| `scaleWidth` | `number` |
| `scaleHeight` | `number` |
| `offsetX` | `number` |
| `offsetY` | `number` |

#### Returns

`void`

#### Defined in

[src/Screen.ts:405](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L405)
