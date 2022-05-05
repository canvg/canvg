---
id: "presets"
title: "Namespace: presets"
sidebar_label: "presets"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### node

▸ **node**(`config`): `Object`

Options preset for `node-canvas`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `IConfig` | Preset requirements. |

#### Returns

`Object`

Preset object.

| Name | Type |
| :------ | :------ |
| `window` | `any` |
| `ignoreAnimation` | `boolean` |
| `ignoreMouse` | `boolean` |
| `DOMParser` | `DOMParser` |
| `fetch` | `Fetch` |
| `createCanvas` | (`width`: `number`, `height`: `number`) => `any` |
| `createImage` | (`src`: `string`) => `Promise`<`any`\> |

#### Defined in

[src/presets/node.ts:40](https://github.com/canvg/canvg/blob/5c58ee8/src/presets/node.ts#L40)

___

### offscreen

▸ **offscreen**(`config?`): `Object`

Options preset for `OffscreenCanvas`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `IConfig` | Preset requirements. |

#### Returns

`Object`

Preset object.

| Name | Type |
| :------ | :------ |
| `window` | `any` |
| `ignoreAnimation` | `boolean` |
| `ignoreMouse` | `boolean` |
| `DOMParser` | `DOMParser` |
| `createCanvas` | (`width`: `number`, `height`: `number`) => `OffscreenCanvas` |
| `createImage` | (`url`: `string`) => `Promise`<`ImageBitmap`\> |

#### Defined in

[src/presets/offscreen.ts:16](https://github.com/canvg/canvg/blob/5c58ee8/src/presets/offscreen.ts#L16)
