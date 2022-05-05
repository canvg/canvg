---
id: "IParserOptions"
title: "Interface: IParserOptions"
sidebar_label: "IParserOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`IParserOptions`**

  ↳ [`IOptions`](IOptions.md)

## Properties

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

[src/Parser.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L10)

___

### DOMParser

• `Optional` **DOMParser**: `Object`

XML/HTML parser from string into DOM Document.

#### Defined in

[src/Parser.ts:14](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L14)
