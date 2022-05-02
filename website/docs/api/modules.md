---
id: "modules"
title: "canvg"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [presets](namespaces/presets.md)

## Classes

- [AElement](classes/AElement.md)
- [AnimateColorElement](classes/AnimateColorElement.md)
- [AnimateElement](classes/AnimateElement.md)
- [AnimateTransformElement](classes/AnimateTransformElement.md)
- [BoundingBox](classes/BoundingBox.md)
- [Canvg](classes/Canvg.md)
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
- [Font](classes/Font.md)
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
- [Matrix](classes/Matrix.md)
- [MissingGlyphElement](classes/MissingGlyphElement.md)
- [Mouse](classes/Mouse.md)
- [Parser](classes/Parser.md)
- [PathElement](classes/PathElement.md)
- [PathParser](classes/PathParser.md)
- [PatternElement](classes/PatternElement.md)
- [Point](classes/Point.md)
- [PolygonElement](classes/PolygonElement.md)
- [PolylineElement](classes/PolylineElement.md)
- [Property](classes/Property.md)
- [RadialGradientElement](classes/RadialGradientElement.md)
- [RectElement](classes/RectElement.md)
- [RenderedElement](classes/RenderedElement.md)
- [Rotate](classes/Rotate.md)
- [SVGElement](classes/SVGElement.md)
- [SVGFontLoader](classes/SVGFontLoader.md)
- [Scale](classes/Scale.md)
- [Screen](classes/Screen.md)
- [Skew](classes/Skew.md)
- [SkewX](classes/SkewX.md)
- [SkewY](classes/SkewY.md)
- [StopElement](classes/StopElement.md)
- [StyleElement](classes/StyleElement.md)
- [SymbolElement](classes/SymbolElement.md)
- [TRefElement](classes/TRefElement.md)
- [TSpanElement](classes/TSpanElement.md)
- [TextElement](classes/TextElement.md)
- [TextPathElement](classes/TextPathElement.md)
- [TitleElement](classes/TitleElement.md)
- [Transform](classes/Transform.md)
- [Translate](classes/Translate.md)
- [UnknownElement](classes/UnknownElement.md)
- [UseElement](classes/UseElement.md)
- [ViewPort](classes/ViewPort.md)

## Interfaces

- [IDocumentOptions](interfaces/IDocumentOptions.md)
- [IEvent](interfaces/IEvent.md)
- [IOptions](interfaces/IOptions.md)
- [IParserOptions](interfaces/IParserOptions.md)
- [IScreenOptions](interfaces/IScreenOptions.md)
- [IScreenStartOptions](interfaces/IScreenStartOptions.md)
- [IScreenViewBoxConfig](interfaces/IScreenViewBoxConfig.md)
- [IViewPortSize](interfaces/IViewPortSize.md)

## Type aliases

### AnyElement

Ƭ **AnyElement**: `Elements`[keyof `Elements`]

#### Defined in

[src/Document/elements.ts:93](https://github.com/canvg/canvg/blob/c44de87/src/Document/elements.ts#L93)

___

### Axis

Ƭ **Axis**: ``"x"`` \| ``"y"``

#### Defined in

[src/ViewPort.ts:7](https://github.com/canvg/canvg/blob/c44de87/src/ViewPort.ts#L7)

___

### Command

Ƭ **Command**: { `type`: [`CommandType`](modules.md#commandtype)  } & `Omit`<`CommandM`, ``"type"``\> & `Omit`<`CommandL`, ``"type"``\> & `Omit`<`CommandH`, ``"type"``\> & `Omit`<`CommandV`, ``"type"``\> & `Omit`<`CommandZ`, ``"type"``\> & `Omit`<`CommandQ`, ``"type"``\> & `Omit`<`CommandT`, ``"type"``\> & `Omit`<`CommandC`, ``"type"``\> & `Omit`<`CommandS`, ``"type"``\> & `Omit`<`CommandA`, ``"type"``\>

#### Defined in

[src/PathParser.ts:18](https://github.com/canvg/canvg/blob/c44de87/src/PathParser.ts#L18)

___

### CommandType

Ƭ **CommandType**: `SVGCommand`[``"type"``]

#### Defined in

[src/PathParser.ts:17](https://github.com/canvg/canvg/blob/c44de87/src/PathParser.ts#L17)

___

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

[src/Document/Document.ts:19](https://github.com/canvg/canvg/blob/c44de87/src/Document/Document.ts#L19)

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

[src/Document/Document.ts:24](https://github.com/canvg/canvg/blob/c44de87/src/Document/Document.ts#L24)

___

### Fetch

Ƭ **Fetch**: typeof [`__type`](interfaces/IOptions.md#__type)

#### Defined in

[src/types.ts:7](https://github.com/canvg/canvg/blob/c44de87/src/types.ts#L7)

___

### IViewBoxConfig

Ƭ **IViewBoxConfig**: `Omit`<[`IScreenViewBoxConfig`](interfaces/IScreenViewBoxConfig.md), ``"document"``\>

#### Defined in

[src/Document/Document.ts:49](https://github.com/canvg/canvg/blob/c44de87/src/Document/Document.ts#L49)

___

### MatrixValue

Ƭ **MatrixValue**: readonly [`number`, `number`, `number`, `number`, `number`, `number`]

#### Defined in

[src/types.ts:1](https://github.com/canvg/canvg/blob/c44de87/src/types.ts#L1)

___

### RenderingContext2D

Ƭ **RenderingContext2D**: `CanvasRenderingContext2D` \| `OffscreenCanvasRenderingContext2D`

#### Defined in

[src/types.ts:5](https://github.com/canvg/canvg/blob/c44de87/src/types.ts#L5)

___

### VectorValue

Ƭ **VectorValue**: readonly [`number`, `number`]

#### Defined in

[src/types.ts:3](https://github.com/canvg/canvg/blob/c44de87/src/types.ts#L3)

## Variables

### PSEUDO\_ZERO

• `Const` **PSEUDO\_ZERO**: ``1e-8``

#### Defined in

[src/util/math.ts:3](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L3)

___

### elements

• `Const` **elements**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `a` | typeof [`AElement`](classes/AElement.md) |
| `animate` | typeof [`AnimateElement`](classes/AnimateElement.md) |
| `animateColor` | typeof [`AnimateColorElement`](classes/AnimateColorElement.md) |
| `animateTransform` | typeof [`AnimateTransformElement`](classes/AnimateTransformElement.md) |
| `circle` | typeof [`CircleElement`](classes/CircleElement.md) |
| `clipPath` | typeof [`ClipPathElement`](classes/ClipPathElement.md) |
| `defs` | typeof [`DefsElement`](classes/DefsElement.md) |
| `desc` | typeof [`DescElement`](classes/DescElement.md) |
| `ellipse` | typeof [`EllipseElement`](classes/EllipseElement.md) |
| `feColorMatrix` | typeof [`FeColorMatrixElement`](classes/FeColorMatrixElement.md) |
| `feComposite` | typeof [`FeCompositeElement`](classes/FeCompositeElement.md) |
| `feDropShadow` | typeof [`FeDropShadowElement`](classes/FeDropShadowElement.md) |
| `feGaussianBlur` | typeof [`FeGaussianBlurElement`](classes/FeGaussianBlurElement.md) |
| `feMorphology` | typeof [`FeMorphologyElement`](classes/FeMorphologyElement.md) |
| `filter` | typeof [`FilterElement`](classes/FilterElement.md) |
| `font` | typeof [`FontElement`](classes/FontElement.md) |
| `font-face` | typeof [`FontFaceElement`](classes/FontFaceElement.md) |
| `g` | typeof [`GElement`](classes/GElement.md) |
| `glyph` | typeof [`GlyphElement`](classes/GlyphElement.md) |
| `image` | typeof [`ImageElement`](classes/ImageElement.md) |
| `line` | typeof [`LineElement`](classes/LineElement.md) |
| `linearGradient` | typeof [`LinearGradientElement`](classes/LinearGradientElement.md) |
| `marker` | typeof [`MarkerElement`](classes/MarkerElement.md) |
| `mask` | typeof [`MaskElement`](classes/MaskElement.md) |
| `missing-glyph` | typeof [`MissingGlyphElement`](classes/MissingGlyphElement.md) |
| `path` | typeof [`PathElement`](classes/PathElement.md) |
| `pattern` | typeof [`PatternElement`](classes/PatternElement.md) |
| `polygon` | typeof [`PolygonElement`](classes/PolygonElement.md) |
| `polyline` | typeof [`PolylineElement`](classes/PolylineElement.md) |
| `radialGradient` | typeof [`RadialGradientElement`](classes/RadialGradientElement.md) |
| `rect` | typeof [`RectElement`](classes/RectElement.md) |
| `stop` | typeof [`StopElement`](classes/StopElement.md) |
| `style` | typeof [`StyleElement`](classes/StyleElement.md) |
| `svg` | typeof [`SVGElement`](classes/SVGElement.md) |
| `symbol` | typeof [`SymbolElement`](classes/SymbolElement.md) |
| `text` | typeof [`TextElement`](classes/TextElement.md) |
| `textPath` | typeof [`TextPathElement`](classes/TextPathElement.md) |
| `title` | typeof [`TitleElement`](classes/TitleElement.md) |
| `tref` | typeof [`TRefElement`](classes/TRefElement.md) |
| `tspan` | typeof [`TSpanElement`](classes/TSpanElement.md) |
| `use` | typeof [`UseElement`](classes/UseElement.md) |

#### Defined in

[src/Document/elements.ts:47](https://github.com/canvg/canvg/blob/c44de87/src/Document/elements.ts#L47)

## Functions

### CB1

▸ **CB1**(`t`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `number` |

#### Returns

`number`

#### Defined in

[src/util/math.ts:34](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L34)

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

[src/util/math.ts:38](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L38)

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

[src/util/math.ts:42](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L42)

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

[src/util/math.ts:46](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L46)

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

[src/util/math.ts:50](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L50)

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

[src/util/math.ts:54](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L54)

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

[src/util/math.ts:58](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L58)

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

[src/util/string.ts:8](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L8)

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

[src/util/styles.ts:26](https://github.com/canvg/canvg/blob/c44de87/src/util/styles.ts#L26)

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

[src/util/string.ts:68](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L68)

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

[src/util/string.ts:100](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L100)

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

[src/util/string.ts:81](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L81)

___

### toMatrixValue

▸ **toMatrixValue**(`str`): [`MatrixValue`](modules.md#matrixvalue)

String to matrix value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Numbers string. |

#### Returns

[`MatrixValue`](modules.md#matrixvalue)

Matrix value.

#### Defined in

[src/util/string.ts:46](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L46)

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

[src/util/string.ts:35](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L35)

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

[src/util/string.ts:17](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L17)

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

[src/util/string.ts:26](https://github.com/canvg/canvg/blob/c44de87/src/util/string.ts#L26)

___

### vectorMagnitude

▸ **vectorMagnitude**(`v`): `number`

Vector magnitude.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`VectorValue`](modules.md#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:10](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L10)

___

### vectorsAngle

▸ **vectorsAngle**(`u`, `v`): `number`

Angle between two vectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | [`VectorValue`](modules.md#vectorvalue) |
| `v` | [`VectorValue`](modules.md#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:30](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L30)

___

### vectorsRatio

▸ **vectorsRatio**(`u`, `v`): `number`

Ratio between two vectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | [`VectorValue`](modules.md#vectorvalue) |
| `v` | [`VectorValue`](modules.md#vectorvalue) |

#### Returns

`number`

Number result.

#### Defined in

[src/util/math.ts:20](https://github.com/canvg/canvg/blob/c44de87/src/util/math.ts#L20)
