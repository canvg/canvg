---
id: "Parser"
title: "Class: Parser"
sidebar_label: "Parser"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### fetch

• `Private` `Readonly` **fetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

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

[src/Parser.ts:23](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L23)

___

### DOMParser

• `Private` `Readonly` **DOMParser**: `Object`

#### Defined in

[src/Parser.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L24)

## Constructors

### constructor

• **new Parser**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`IParserOptions`](../interfaces/IParserOptions.md) |

#### Defined in

[src/Parser.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L26)

## Methods

### parse

▸ **parse**(`resource`): `Promise`<`Document`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | `string` |

#### Returns

`Promise`<`Document`\>

#### Defined in

[src/Parser.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L42)

___

### parseFromString

▸ **parseFromString**(`xml`): `Document`

#### Parameters

| Name | Type |
| :------ | :------ |
| `xml` | `string` |

#### Returns

`Document`

#### Defined in

[src/Parser.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L50)

___

### checkDocument

▸ `Private` **checkDocument**(`document`): `Document`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |

#### Returns

`Document`

#### Defined in

[src/Parser.ts:64](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L64)

___

### load

▸ **load**(`url`): `Promise`<`Document`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`Document`\>

#### Defined in

[src/Parser.ts:74](https://github.com/canvg/canvg/blob/5c58ee8/src/Parser.ts#L74)
