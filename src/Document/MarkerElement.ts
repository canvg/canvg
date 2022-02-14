import { RenderingContext2D } from '../types'
import { Point } from '../Point'
import { Property } from '../Property'
import { Element } from './Element'
import { SVGElement } from './SVGElement'

export class MarkerElement extends Element {
  override type = 'marker'

  override render(ctx: RenderingContext2D, point?: Point, angle?: number) {
    if (!point) {
      return
    }

    const {
      x,
      y
    } = point
    const orient = this.getAttribute('orient').getString('auto')
    const markerUnits = this.getAttribute('markerUnits').getString('strokeWidth')

    ctx.translate(x, y)

    if (orient === 'auto') {
      ctx.rotate(angle)
    }

    if (markerUnits === 'strokeWidth') {
      ctx.scale(ctx.lineWidth, ctx.lineWidth)
    }

    ctx.save()

    // render me using a temporary svg element
    const markerSvg = new SVGElement(this.document)

    markerSvg.type = this.type
    markerSvg.attributes.viewBox = new Property(
      this.document,
      'viewBox',
      this.getAttribute('viewBox').getValue()
    )
    markerSvg.attributes.refX = new Property(
      this.document,
      'refX',
      this.getAttribute('refX').getValue()
    )
    markerSvg.attributes.refY = new Property(
      this.document,
      'refY',
      this.getAttribute('refY').getValue()
    )
    markerSvg.attributes.width = new Property(
      this.document,
      'width',
      this.getAttribute('markerWidth').getValue()
    )
    markerSvg.attributes.height = new Property(
      this.document,
      'height',
      this.getAttribute('markerHeight').getValue()
    )
    markerSvg.attributes.overflow = new Property(
      this.document,
      'overflow',
      this.getAttribute('overflow').getValue()
    )
    markerSvg.attributes.fill = new Property(
      this.document,
      'fill',
      this.getAttribute('fill').getColor('black')
    )
    markerSvg.attributes.stroke = new Property(
      this.document,
      'stroke',
      this.getAttribute('stroke').getValue('none')
    )
    markerSvg.children = this.children

    markerSvg.render(ctx)

    ctx.restore()

    if (markerUnits === 'strokeWidth') {
      ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth)
    }

    if (orient === 'auto') {
      ctx.rotate(-angle)
    }

    ctx.translate(-x, -y)
  }
}
