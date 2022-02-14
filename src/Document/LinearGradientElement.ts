import { RenderingContext2D } from '../types'
import { Document } from './Document'
import { PathElement } from './PathElement'
import { GradientElement } from './GradientElement'

export class LinearGradientElement extends GradientElement {
  override type = 'linearGradient'

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.attributesToInherit.push(
      'x1',
      'y1',
      'x2',
      'y2'
    )
  }

  getGradient(ctx: RenderingContext2D, element: PathElement) {
    const isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox'
    const boundingBox = isBoundingBoxUnits
      ? element.getBoundingBox(ctx)
      : null

    if (isBoundingBoxUnits && !boundingBox) {
      return null
    }

    if (!this.getAttribute('x1').hasValue()
      && !this.getAttribute('y1').hasValue()
      && !this.getAttribute('x2').hasValue()
      && !this.getAttribute('y2').hasValue()
    ) {
      this.getAttribute('x1', true).setValue(0)
      this.getAttribute('y1', true).setValue(0)
      this.getAttribute('x2', true).setValue(1)
      this.getAttribute('y2', true).setValue(0)
    }

    const x1 = isBoundingBoxUnits
      ? boundingBox.x + boundingBox.width * this.getAttribute('x1').getNumber()
      : this.getAttribute('x1').getPixels('x')
    const y1 = isBoundingBoxUnits
      ? boundingBox.y + boundingBox.height * this.getAttribute('y1').getNumber()
      : this.getAttribute('y1').getPixels('y')
    const x2 = isBoundingBoxUnits
      ? boundingBox.x + boundingBox.width * this.getAttribute('x2').getNumber()
      : this.getAttribute('x2').getPixels('x')
    const y2 = isBoundingBoxUnits
      ? boundingBox.y + boundingBox.height * this.getAttribute('y2').getNumber()
      : this.getAttribute('y2').getPixels('y')

    if (x1 === x2 && y1 === y2) {
      return null
    }

    return ctx.createLinearGradient(x1, y1, x2, y2)
  }
}
