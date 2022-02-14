import { RenderingContext2D } from '../types'
import { Property } from '../Property'
import { Element } from './Element'
import { SVGElement } from './SVGElement'

export class PatternElement extends Element {
  override type = 'pattern'

  createPattern(
    ctx: RenderingContext2D,
    _: Element,
    parentOpacityProp: Property
  ) {
    const width = this.getStyle('width').getPixels('x', true)
    const height = this.getStyle('height').getPixels('y', true)
    // render me using a temporary svg element
    const patternSvg = new SVGElement(
      this.document,
      null
    )

    patternSvg.attributes.viewBox = new Property(
      this.document,
      'viewBox',
      this.getAttribute('viewBox').getValue()
    )
    patternSvg.attributes.width = new Property(
      this.document,
      'width',
      `${width}px`
    )
    patternSvg.attributes.height = new Property(
      this.document,
      'height',
      `${height}px`
    )
    patternSvg.attributes.transform = new Property(
      this.document,
      'transform',
      this.getAttribute('patternTransform').getValue()
    )
    patternSvg.children = this.children

    const patternCanvas = this.document.createCanvas(width, height)
    const patternCtx = patternCanvas.getContext('2d')
    const xAttr = this.getAttribute('x')
    const yAttr = this.getAttribute('y')

    if (xAttr.hasValue() && yAttr.hasValue()) {
      patternCtx.translate(
        xAttr.getPixels('x', true),
        yAttr.getPixels('y', true)
      )
    }

    if (parentOpacityProp.hasValue()) {
      this.styles['fill-opacity'] = parentOpacityProp
    } else {
      Reflect.deleteProperty(this.styles, 'fill-opacity')
    }

    // render 3x3 grid so when we transform there's no white space on edges
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        patternCtx.save()
        patternSvg.attributes.x = new Property(
          this.document,
          'x',
          x * patternCanvas.width
        )
        patternSvg.attributes.y = new Property(
          this.document,
          'y',
          y * patternCanvas.height
        )
        patternSvg.render(patternCtx)
        patternCtx.restore()
      }
    }

    const pattern = ctx.createPattern(patternCanvas as CanvasImageSource, 'repeat')

    return pattern
  }
}
