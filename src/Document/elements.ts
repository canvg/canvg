import { Element } from './Element'
import { UnknownElement } from './UnknownElement'
import { RenderedElement } from './RenderedElement'
import { PathElement } from './PathElement'
import { SVGElement } from './SVGElement'
import { RectElement } from './RectElement'
import { CircleElement } from './CircleElement'
import { EllipseElement } from './EllipseElement'
import { LineElement } from './LineElement'
import { PolylineElement } from './PolylineElement'
import { PolygonElement } from './PolygonElement'
import { PatternElement } from './PatternElement'
import { MarkerElement } from './MarkerElement'
import { DefsElement } from './DefsElement'
import { GradientElement } from './GradientElement'
import { LinearGradientElement } from './LinearGradientElement'
import { RadialGradientElement } from './RadialGradientElement'
import { StopElement } from './StopElement'
import { AnimateElement } from './AnimateElement'
import { AnimateColorElement } from './AnimateColorElement'
import { AnimateTransformElement } from './AnimateTransformElement'
import { FontElement } from './FontElement'
import { FontFaceElement } from './FontFaceElement'
import { MissingGlyphElement } from './MissingGlyphElement'
import { GlyphElement } from './GlyphElement'
import { TextElement } from './TextElement'
import { TSpanElement } from './TSpanElement'
import { TRefElement } from './TRefElement'
import { AElement } from './AElement'
import { TextPathElement } from './TextPathElement'
import { ImageElement } from './ImageElement'
import { GElement } from './GElement'
import { SymbolElement } from './SymbolElement'
import { StyleElement } from './StyleElement'
import { UseElement } from './UseElement'
import { MaskElement } from './MaskElement'
import { ClipPathElement } from './ClipPathElement'
import { FilterElement } from './FilterElement'
import { FeDropShadowElement } from './FeDropShadowElement'
import { FeMorphologyElement } from './FeMorphologyElement'
import { FeCompositeElement } from './FeCompositeElement'
import { FeColorMatrixElement } from './FeColorMatrixElement'
import { FeGaussianBlurElement } from './FeGaussianBlurElement'
import { TitleElement } from './TitleElement'
import { DescElement } from './DescElement'

export const elements = {
  'svg': SVGElement,
  'rect': RectElement,
  'circle': CircleElement,
  'ellipse': EllipseElement,
  'line': LineElement,
  'polyline': PolylineElement,
  'polygon': PolygonElement,
  'path': PathElement,
  'pattern': PatternElement,
  'marker': MarkerElement,
  'defs': DefsElement,
  'linearGradient': LinearGradientElement,
  'radialGradient': RadialGradientElement,
  'stop': StopElement,
  'animate': AnimateElement,
  'animateColor': AnimateColorElement,
  'animateTransform': AnimateTransformElement,
  'font': FontElement,
  'font-face': FontFaceElement,
  'missing-glyph': MissingGlyphElement,
  'glyph': GlyphElement,
  'text': TextElement,
  'tspan': TSpanElement,
  'tref': TRefElement,
  'a': AElement,
  'textPath': TextPathElement,
  'image': ImageElement,
  'g': GElement,
  'symbol': SymbolElement,
  'style': StyleElement,
  'use': UseElement,
  'mask': MaskElement,
  'clipPath': ClipPathElement,
  'filter': FilterElement,
  'feDropShadow': FeDropShadowElement,
  'feMorphology': FeMorphologyElement,
  'feComposite': FeCompositeElement,
  'feColorMatrix': FeColorMatrixElement,
  'feGaussianBlur': FeGaussianBlurElement,
  'title': TitleElement,
  'desc': DescElement
}

type Elements = typeof elements

export type AnyElement = Elements[keyof Elements]

export {
  Element,
  UnknownElement,
  RenderedElement,
  PathElement,
  SVGElement,
  RectElement,
  CircleElement,
  EllipseElement,
  LineElement,
  PolylineElement,
  PolygonElement,
  PatternElement,
  MarkerElement,
  DefsElement,
  GradientElement,
  LinearGradientElement,
  RadialGradientElement,
  StopElement,
  AnimateElement,
  AnimateColorElement,
  AnimateTransformElement,
  FontElement,
  FontFaceElement,
  MissingGlyphElement,
  GlyphElement,
  TextElement,
  TSpanElement,
  TRefElement,
  AElement,
  TextPathElement,
  ImageElement,
  GElement,
  SymbolElement,
  StyleElement,
  UseElement,
  MaskElement,
  ClipPathElement,
  FilterElement,
  FeDropShadowElement,
  FeMorphologyElement,
  FeCompositeElement,
  FeColorMatrixElement,
  FeGaussianBlurElement,
  TitleElement,
  DescElement
}
