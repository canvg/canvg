---
id: "index"
title: "canvg"
slug: "/api/"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [BoundingBox](classes/BoundingBox.md)
- [Canvg](classes/Canvg.md)
- [AElement](classes/AElement.md)
- [AnimateColorElement](classes/AnimateColorElement.md)
- [AnimateElement](classes/AnimateElement.md)
- [AnimateTransformElement](classes/AnimateTransformElement.md)
- [CircleElement](classes/CircleElement.md)
- [ClipPathElement](classes/ClipPathElement.md)
- [DefsElement](classes/DefsElement.md)
- [DescElement](classes/DescElement.md)
- [Document](classes/Document.md)
- [Element](classes/Element.md)
- [EllipseElement](classes/EllipseElement.md)
- [FeColorMatrixElement](classes/FeColorMatrixElement.md)
- [FeCompositeElement](classes/FeCompositeElement.md)
- [FeDropShadowElement](classes/FeDropShadowElement.md)
- [FeGaussianBlurElement](classes/FeGaussianBlurElement.md)
- [FeMorphologyElement](classes/FeMorphologyElement.md)
- [FilterElement](classes/FilterElement.md)
- [FontElement](classes/FontElement.md)
- [FontFaceElement](classes/FontFaceElement.md)
- [GElement](classes/GElement.md)
- [GlyphElement](classes/GlyphElement.md)
- [GradientElement](classes/GradientElement.md)
- [ImageElement](classes/ImageElement.md)
- [LineElement](classes/LineElement.md)
- [LinearGradientElement](classes/LinearGradientElement.md)
- [MarkerElement](classes/MarkerElement.md)
- [MaskElement](classes/MaskElement.md)
- [MissingGlyphElement](classes/MissingGlyphElement.md)
- [PathElement](classes/PathElement.md)
- [PatternElement](classes/PatternElement.md)
- [PolygonElement](classes/PolygonElement.md)
- [PolylineElement](classes/PolylineElement.md)
- [RadialGradientElement](classes/RadialGradientElement.md)
- [RectElement](classes/RectElement.md)
- [RenderedElement](classes/RenderedElement.md)
- [SVGElement](classes/SVGElement.md)
- [StopElement](classes/StopElement.md)
- [StyleElement](classes/StyleElement.md)
- [SymbolElement](classes/SymbolElement.md)
- [TRefElement](classes/TRefElement.md)
- [TSpanElement](classes/TSpanElement.md)
- [TextElement](classes/TextElement.md)
- [TextPathElement](classes/TextPathElement.md)
- [TitleElement](classes/TitleElement.md)
- [UnknownElement](classes/UnknownElement.md)
- [UseElement](classes/UseElement.md)
- [Font](classes/Font.md)
- [Mouse](classes/Mouse.md)
- [Parser](classes/Parser.md)
- [PathParser](classes/PathParser.md)
- [Point](classes/Point.md)
- [Property](classes/Property.md)
- [SVGFontLoader](classes/SVGFontLoader.md)
- [Screen](classes/Screen.md)
- [Matrix](classes/Matrix.md)
- [Rotate](classes/Rotate.md)
- [Scale](classes/Scale.md)
- [Skew](classes/Skew.md)
- [SkewX](classes/SkewX.md)
- [SkewY](classes/SkewY.md)
- [Transform](classes/Transform.md)
- [Translate](classes/Translate.md)
- [ViewPort](classes/ViewPort.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)
- [IDocumentOptions](interfaces/IDocumentOptions.md)
- [IEvent](interfaces/IEvent.md)
- [IParserOptions](interfaces/IParserOptions.md)
- [IScreenOptions](interfaces/IScreenOptions.md)
- [IScreenStartOptions](interfaces/IScreenStartOptions.md)
- [IScreenViewBoxConfig](interfaces/IScreenViewBoxConfig.md)
- [IViewPortSize](interfaces/IViewPortSize.md)

## Namespaces

- [presets](namespaces/presets.md)

## Type aliases

### CreateCanvas

Ƭ **CreateCanvas**: (`width`: `number`, `height`: `number`) => `HTMLCanvasElement` \| `OffscreenCanvas`

#### Type declaration

▸ (`width`, `height`): `HTMLCanvasElement` \| `OffscreenCanvas`

Function to create new canvas.

##### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

##### Returns

`HTMLCanvasElement` \| `OffscreenCanvas`

#### Defined in

[src/Document/Document.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L19)

___

### CreateImage

Ƭ **CreateImage**: (`src`: `string`, `anonymousCrossOrigin?`: `boolean`) => `Promise`<`CanvasImageSource`\>

#### Type declaration

▸ (`src`, `anonymousCrossOrigin?`): `Promise`<`CanvasImageSource`\>

Function to create new image.

##### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `anonymousCrossOrigin?` | `boolean` |

##### Returns

`Promise`<`CanvasImageSource`\>

#### Defined in

[src/Document/Document.ts:24](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L24)

___

### IViewBoxConfig

Ƭ **IViewBoxConfig**: `Omit`<[`IScreenViewBoxConfig`](interfaces/IScreenViewBoxConfig.md), ``"document"``\>

#### Defined in

[src/Document/Document.ts:49](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/Document.ts#L49)

___

### AnyElement

Ƭ **AnyElement**: `Elements`[keyof `Elements`]

#### Defined in

[src/Document/elements.ts:93](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/elements.ts#L93)

___

### CommandType

Ƭ **CommandType**: `SVGCommand`[``"type"``]

#### Defined in

[src/PathParser.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L17)

___

### Command

Ƭ **Command**: { `type`: [`CommandType`](#commandtype)  } & `Omit`<`CommandM`, ``"type"``\> & `Omit`<`CommandL`, ``"type"``\> & `Omit`<`CommandH`, ``"type"``\> & `Omit`<`CommandV`, ``"type"``\> & `Omit`<`CommandZ`, ``"type"``\> & `Omit`<`CommandQ`, ``"type"``\> & `Omit`<`CommandT`, ``"type"``\> & `Omit`<`CommandC`, ``"type"``\> & `Omit`<`CommandS`, ``"type"``\> & `Omit`<`CommandA`, ``"type"``\>

#### Defined in

[src/PathParser.ts:18](https://github.com/canvg/canvg/blob/5c58ee8/src/PathParser.ts#L18)

___

### Axis

Ƭ **Axis**: ``"x"`` \| ``"y"``

#### Defined in

[src/ViewPort.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L7)

___

### MatrixValue

Ƭ **MatrixValue**: readonly [`number`, `number`, `number`, `number`, `number`, `number`]

#### Defined in

[src/types.ts:1](https://github.com/canvg/canvg/blob/5c58ee8/src/types.ts#L1)

___

### VectorValue

Ƭ **VectorValue**: readonly [`number`, `number`]

#### Defined in

[src/types.ts:3](https://github.com/canvg/canvg/blob/5c58ee8/src/types.ts#L3)

___

### RenderingContext2D

Ƭ **RenderingContext2D**: `CanvasRenderingContext2D` \| `OffscreenCanvasRenderingContext2D`

#### Defined in

[src/types.ts:5](https://github.com/canvg/canvg/blob/5c58ee8/src/types.ts#L5)

___

### Fetch

Ƭ **Fetch**: typeof [`__type`](interfaces/IOptions.md#__type)

#### Defined in

[src/types.ts:7](https://github.com/canvg/canvg/blob/5c58ee8/src/types.ts#L7)

## Variables

### elements

• `Const` **elements**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `svg` | typeof [`SVGElement`](classes/SVGElement.md) |
| `rect` | typeof [`RectElement`](classes/RectElement.md) |
| `circle` | typeof [`CircleElement`](classes/CircleElement.md) |
| `ellipse` | typeof [`EllipseElement`](classes/EllipseElement.md) |
| `line` | typeof [`LineElement`](classes/LineElement.md) |
| `polyline` | typeof [`PolylineElement`](classes/PolylineElement.md) |
| `polygon` | typeof [`PolygonElement`](classes/PolygonElement.md) |
| `path` | typeof [`PathElement`](classes/PathElement.md) |
| `pattern` | typeof [`PatternElement`](classes/PatternElement.md) |
| `marker` | typeof [`MarkerElement`](classes/MarkerElement.md) |
| `defs` | typeof [`DefsElement`](classes/DefsElement.md) |
| `linearGradient` | typeof [`LinearGradientElement`](classes/LinearGradientElement.md) |
| `radialGradient` | typeof [`RadialGradientElement`](classes/RadialGradientElement.md) |
| `stop` | typeof [`StopElement`](classes/StopElement.md) |
| `animate` | typeof [`AnimateElement`](classes/AnimateElement.md) |
| `animateColor` | typeof [`AnimateColorElement`](classes/AnimateColorElement.md) |
| `animateTransform` | typeof [`AnimateTransformElement`](classes/AnimateTransformElement.md) |
| `font` | typeof [`FontElement`](classes/FontElement.md) |
| `font-face` | typeof [`FontFaceElement`](classes/FontFaceElement.md) |
| `missing-glyph` | typeof [`MissingGlyphElement`](classes/MissingGlyphElement.md) |
| `glyph` | typeof [`GlyphElement`](classes/GlyphElement.md) |
| `text` | typeof [`TextElement`](classes/TextElement.md) |
| `tspan` | typeof [`TSpanElement`](classes/TSpanElement.md) |
| `tref` | typeof [`TRefElement`](classes/TRefElement.md) |
| `a` | typeof [`AElement`](classes/AElement.md) |
| `textPath` | typeof [`TextPathElement`](classes/TextPathElement.md) |
| `image` | typeof [`ImageElement`](classes/ImageElement.md) |
| `g` | typeof [`GElement`](classes/GElement.md) |
| `symbol` | typeof [`SymbolElement`](classes/SymbolElement.md) |
| `style` | typeof [`StyleElement`](classes/StyleElement.md) |
| `use` | typeof [`UseElement`](classes/UseElement.md) |
| `mask` | typeof [`MaskElement`](classes/MaskElement.md) |
| `clipPath` | typeof [`ClipPathElement`](classes/ClipPathElement.md) |
| `filter` | typeof [`FilterElement`](classes/FilterElement.md) |
| `feDropShadow` | typeof [`FeDropShadowElement`](classes/FeDropShadowElement.md) |
| `feMorphology` | typeof [`FeMorphologyElement`](classes/FeMorphologyElement.md) |
| `feComposite` | typeof [`FeCompositeElement`](classes/FeCompositeElement.md) |
| `feColorMatrix` | typeof [`FeColorMatrixElement`](classes/FeColorMatrixElement.md) |
| `feGaussianBlur` | typeof [`FeGaussianBlurElement`](classes/FeGaussianBlurElement.md) |
| `title` | typeof [`TitleElement`](classes/TitleElement.md) |
| `desc` | typeof [`DescElement`](classes/DescElement.md) |

#### Defined in

[src/Document/elements.ts:47](https://github.com/canvg/canvg/blob/5c58ee8/src/Document/elements.ts#L47)

___

### PSEUDO\_ZERO

• `Const` **PSEUDO\_ZERO**: ``1e-8``

#### Defined in

[src/util/math.ts:3](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L3)

## Functions

### vectorMagnitude

▸ **vectorMagnitude**(`v`): `number`

Vector magnitude.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`VectorValue`](#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L10)

___

### vectorsRatio

▸ **vectorsRatio**(`u`, `v`): `number`

Ratio between two vectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | [`VectorValue`](#vectorvalue) |
| `v` | [`VectorValue`](#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:20](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L20)

___

### vectorsAngle

▸ **vectorsAngle**(`u`, `v`): `number`

Angle between two vectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | [`VectorValue`](#vectorvalue) |
| `v` | [`VectorValue`](#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:30](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L30)

___

### CB1

▸ **CB1**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:34](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L34)

___

### CB2

▸ **CB2**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:38](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L38)

___

### CB3

▸ **CB3**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:42](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L42)

___

### CB4

▸ **CB4**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L46)

___

### QB1

▸ **QB1**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:50](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L50)

___

### QB2

▸ **QB2**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:54](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L54)

___

### QB3

▸ **QB3**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:58](https://github.com/canvg/canvg/blob/5c58ee8/src/util/math.ts#L58)

___

### compressSpaces

▸ **compressSpaces**(`str`): `string`

HTML-safe compress white-spaces.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to compress. |

#### Returns

`string`

String.

#### Defined in

[src/util/string.ts:8](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L8)

___

### trimLeft

▸ **trimLeft**(`str`): `string`

HTML-safe left trim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to trim. |

#### Returns

`string`

String.

#### Defined in

[src/util/string.ts:17](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L17)

___

### trimRight

▸ **trimRight**(`str`): `string`

HTML-safe right trim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to trim. |

#### Returns

`string`

String.

#### Defined in

[src/util/string.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L26)

___

### toNumbers

▸ **toNumbers**(`str`): `number`[]

String to numbers array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Numbers string. |

#### Returns

`number`[]

Numbers array.

#### Defined in

[src/util/string.ts:35](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L35)

___

### toMatrixValue

▸ **toMatrixValue**(`str`): [`MatrixValue`](#matrixvalue)

String to matrix value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Numbers string. |

#### Returns

[`MatrixValue`](#matrixvalue)

Matrix value.

#### Defined in

[src/util/string.ts:46](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L46)

___

### normalizeAttributeName

▸ **normalizeAttributeName**(`name`): `string`

Normalize attribute name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Attribute name. |

#### Returns

`string`

Normalized attribute name.

#### Defined in

[src/util/string.ts:68](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L68)

___

### parseExternalUrl

▸ **parseExternalUrl**(`url`): `string`

Parse external URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CSS url string. |

#### Returns

`string`

Parsed URL.

#### Defined in

[src/util/string.ts:81](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L81)

___

### normalizeColor

▸ **normalizeColor**(`color`): `string`

Transform floats to integers in rgb colors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `string` | Color to normalize. |

#### Returns

`string`

Normalized color.

#### Defined in

[src/util/string.ts:100](https://github.com/canvg/canvg/blob/5c58ee8/src/util/string.ts#L100)

___

### getSelectorSpecificity

▸ **getSelectorSpecificity**(`selector`): `string`

Measure selector specificity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `string` | Selector to measure. |

#### Returns

`string`

Specificity.

#### Defined in

[src/util/styles.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/util/styles.ts#L26)
