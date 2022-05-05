---
id: "IScreenOptions"
title: "Interface: IScreenOptions"
sidebar_label: "IScreenOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`IScreenOptions`**

  ↳ [`IOptions`](IOptions.md)

## Properties

### window

• `Optional` **window**: `Window`

Window object.

#### Defined in

[src/Screen.ts:23](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L23)

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

#### Defined in

[src/Screen.ts:27](https://github.com/canvg/canvg/blob/5c58ee8/src/Screen.ts#L27)
