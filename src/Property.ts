import RGBColor from 'rgbcolor'
import {
  compressSpaces,
  normalizeColor
} from './util'
import { Axis } from './ViewPort'
import {
  Document,
  Element,
  PathElement,
  PatternElement,
  GradientElement
} from './Document'

export class Property<T = unknown> {
  static empty(document: Document) {
    return new Property(document, 'EMPTY', '')
  }

  static readonly textBaselineMapping: Record<string, string> = {
    'baseline': 'alphabetic',
    'before-edge': 'top',
    'text-before-edge': 'top',
    'middle': 'middle',
    'central': 'middle',
    'after-edge': 'bottom',
    'text-after-edge': 'bottom',
    'ideographic': 'ideographic',
    'alphabetic': 'alphabetic',
    'hanging': 'hanging',
    'mathematical': 'alphabetic'
  }

  private isNormalizedColor = false

  constructor(
    private readonly document: Document,
    private readonly name: string,
    private value: T
  ) {}

  split(separator = ' ') {
    const {
      document,
      name
    } = this

    return compressSpaces(this.getString())
      .trim()
      .split(separator)
      .map(value => new Property<string>(document, name, value))
  }

  hasValue(zeroIsValue?: boolean) {
    const value = this.value as unknown

    return value !== null
      && value !== ''
      && (zeroIsValue || value !== 0)
      && typeof value !== 'undefined'
  }

  isString(regexp?: RegExp) {
    const { value } = this
    const result = typeof value === 'string'

    if (!result || !regexp) {
      return result
    }

    return regexp.test(value)
  }

  isUrlDefinition() {
    return this.isString(/^url\(/)
  }

  isPixels() {
    if (!this.hasValue()) {
      return false
    }

    const asString = this.getString()

    switch (true) {
      case asString.endsWith('px'):
      case /^[0-9]+$/.test(asString):
        return true

      default:
        return false
    }
  }

  setValue(value: T) {
    this.value = value
    return this
  }

  getValue(def?: T) {
    if (typeof def === 'undefined' || this.hasValue()) {
      return this.value
    }

    return def
  }

  getNumber(def?: T) {
    if (!this.hasValue()) {
      if (typeof def === 'undefined') {
        return 0
      }

      // @ts-expect-error Parse unknown value.
      return parseFloat(def)
    }

    const { value } = this
    // @ts-expect-error Parse unknown value.
    let n = parseFloat(value)

    if (this.isString(/%$/)) {
      n /= 100.0
    }

    return n
  }

  getString(def?: T) {
    if (typeof def === 'undefined' || this.hasValue()) {
      return typeof this.value === 'undefined'
        ? ''
        : String(this.value)
    }

    return String(def)
  }

  getColor(def?: T) {
    let color = this.getString(def)

    if (this.isNormalizedColor) {
      return color
    }

    this.isNormalizedColor = true
    color = normalizeColor(color)
    this.value = color as unknown as T

    return color
  }

  getDpi() {
    return 96.0 // TODO: compute?
  }

  getRem() {
    return this.document.rootEmSize
  }

  getEm() {
    return this.document.emSize
  }

  getUnits() {
    return this.getString().replace(/[0-9.-]/g, '')
  }

  getPixels(axis?: Axis, processPercent?: boolean): number
  getPixels(isFontSize?: boolean): number
  getPixels(axisOrIsFontSize?: Axis | boolean, processPercent = false): number {
    if (!this.hasValue()) {
      return 0
    }

    const [axis, isFontSize] = typeof axisOrIsFontSize === 'boolean'
      ? [undefined, axisOrIsFontSize]
      : [axisOrIsFontSize]
    const { viewPort } = this.document.screen

    switch (true) {
      case this.isString(/vmin$/):
        return this.getNumber()
          / 100.0
          * Math.min(
            viewPort.computeSize('x'),
            viewPort.computeSize('y')
          )

      case this.isString(/vmax$/):
        return this.getNumber()
          / 100.0
          * Math.max(
            viewPort.computeSize('x'),
            viewPort.computeSize('y')
          )

      case this.isString(/vw$/):
        return this.getNumber()
          / 100.0
          * viewPort.computeSize('x')

      case this.isString(/vh$/):
        return this.getNumber()
          / 100.0
          * viewPort.computeSize('y')

      case this.isString(/rem$/):
        return this.getNumber() * this.getRem(/* viewPort */)

      case this.isString(/em$/):
        return this.getNumber() * this.getEm(/* viewPort */)

      case this.isString(/ex$/):
        return this.getNumber() * this.getEm(/* viewPort */) / 2.0

      case this.isString(/px$/):
        return this.getNumber()

      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi(/* viewPort */) * (1.0 / 72.0)

      case this.isString(/pc$/):
        return this.getNumber() * 15

      case this.isString(/cm$/):
        return this.getNumber() * this.getDpi(/* viewPort */) / 2.54

      case this.isString(/mm$/):
        return this.getNumber() * this.getDpi(/* viewPort */) / 25.4

      case this.isString(/in$/):
        return this.getNumber() * this.getDpi(/* viewPort */)

      case this.isString(/%$/) && isFontSize:
        return this.getNumber() * this.getEm(/* viewPort */)

      case this.isString(/%$/):
        return this.getNumber() * viewPort.computeSize(axis)

      default: {
        const n = this.getNumber()

        if (processPercent && n < 1.0) {
          return n * viewPort.computeSize(axis)
        }

        return n
      }
    }
  }

  getMilliseconds() {
    if (!this.hasValue()) {
      return 0
    }

    if (this.isString(/ms$/)) {
      return this.getNumber()
    }

    return this.getNumber() * 1000
  }

  getRadians() {
    if (!this.hasValue()) {
      return 0
    }

    switch (true) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180.0)

      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200.0)

      case this.isString(/rad$/):
        return this.getNumber()

      default:
        return this.getNumber() * (Math.PI / 180.0)
    }
  }

  getDefinition<T extends Element>() {
    const asString = this.getString()
    const match = /#([^)'"]+)/.exec(asString)
    const name = match?.[1] || asString

    return this.document.definitions[name] as T | undefined
  }

  getFillStyleDefinition(element: Element | PathElement, opacity: Property) {
    let def = this.getDefinition<PatternElement & GradientElement>()

    if (!def) {
      return null
    }

    // gradient
    if (typeof def.createGradient === 'function' && 'getBoundingBox' in element) {
      return def.createGradient(
        this.document.ctx,
        element,
        opacity
      )
    }

    // pattern
    if (typeof def.createPattern === 'function') {
      if (def.getHrefAttribute().hasValue()) {
        const patternTransform = def.getAttribute('patternTransform')

        def = def.getHrefAttribute().getDefinition()

        if (def && patternTransform.hasValue()) {
          def.getAttribute('patternTransform', true).setValue(patternTransform.value)
        }
      }

      if (def) {
        return def.createPattern(this.document.ctx, element, opacity)
      }
    }

    return null
  }

  getTextBaseline() {
    if (!this.hasValue()) {
      return null
    }

    const key = this.getString()

    return Property.textBaselineMapping[key] || null
  }

  addOpacity(opacity: Property) {
    let value = this.getColor()
    const len = value.length
    let commas = 0

    // Simulate old RGBColor version, which can't parse rgba.
    for (let i = 0; i < len; i++) {
      if (value[i] === ',') {
        commas++
      }

      if (commas === 3) {
        break
      }
    }

    if (opacity.hasValue() && this.isString() && commas !== 3) {
      const color = new RGBColor(value)

      if (color.ok) {
        color.alpha = opacity.getNumber()
        value = color.toRGBA()
      }
    }

    return new Property<string>(this.document, this.name, value)
  }
}
