import { RenderingContext2D } from '../types'
import { Document } from './Document'
import { PathElement } from './PathElement'
import { GradientElement } from './GradientElement'

export class RadialGradientElement extends GradientElement {
  override type = 'radialGradient'

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.attributesToInherit.push(
      'cx',
      'cy',
      'r',
      'fx',
      'fy',
      'fr'
    )
  }

  getGradient(ctx: RenderingContext2D, element: PathElement) {
    const isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox'
    const boundingBox = element.getBoundingBox(ctx)

    if (isBoundingBoxUnits && !boundingBox) {
      return null
    }

    if (!this.getAttribute('cx').hasValue()) {
      this.getAttribute('cx', true).setValue('50%')
    }

    if (!this.getAttribute('cy').hasValue()) {
      this.getAttribute('cy', true).setValue('50%')
    }

    if (!this.getAttribute('r').hasValue()) {
      this.getAttribute('r', true).setValue('50%')
    }

    const cx = isBoundingBoxUnits
      ? boundingBox.x + boundingBox.width * this.getAttribute('cx').getNumber()
      : this.getAttribute('cx').getPixels('x')
    const cy = isBoundingBoxUnits
      ? boundingBox.y + boundingBox.height * this.getAttribute('cy').getNumber()
      : this.getAttribute('cy').getPixels('y')
    let fx = cx
    let fy = cy

    if (this.getAttribute('fx').hasValue()) {
      fx = isBoundingBoxUnits
        ? boundingBox.x + boundingBox.width * this.getAttribute('fx').getNumber()
        : this.getAttribute('fx').getPixels('x')
    }

    if (this.getAttribute('fy').hasValue()) {
      fy = isBoundingBoxUnits
        ? boundingBox.y + boundingBox.height * this.getAttribute('fy').getNumber()
        : this.getAttribute('fy').getPixels('y')
    }

    const r = isBoundingBoxUnits
      ? (boundingBox.width + boundingBox.height) / 2.0 * this.getAttribute('r').getNumber()
      : this.getAttribute('r').getPixels()
    const fr = this.getAttribute('fr').getPixels()

    return ctx.createRadialGradient(fx, fy, fr, cx, cy, r)
  }
}
