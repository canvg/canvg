import { RenderingContext2D } from '../types'
import { BoundingBox } from '../BoundingBox'
import { PathElement } from './PathElement'

export class RectElement extends PathElement {
  override type = 'rect'

  override path(ctx: RenderingContext2D) {
    const x = this.getAttribute('x').getPixels('x')
    const y = this.getAttribute('y').getPixels('y')
    const width = this.getStyle('width', false, true).getPixels('x')
    const height = this.getStyle('height', false, true).getPixels('y')
    const rxAttr = this.getAttribute('rx')
    const ryAttr = this.getAttribute('ry')
    let rx = rxAttr.getPixels('x')
    let ry = ryAttr.getPixels('y')

    if (rxAttr.hasValue() && !ryAttr.hasValue()) {
      ry = rx
    }

    if (ryAttr.hasValue() && !rxAttr.hasValue()) {
      rx = ry
    }

    rx = Math.min(rx, width / 2.0)
    ry = Math.min(ry, height / 2.0)

    if (ctx) {
      const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3)

      ctx.beginPath() // always start the path so we don't fill prior paths

      if (height > 0 && width > 0) {
        ctx.moveTo(x + rx, y)
        ctx.lineTo(x + width - rx, y)
        ctx.bezierCurveTo(x + width - rx + (KAPPA * rx), y, x + width, y + ry - (KAPPA * ry), x + width, y + ry)
        ctx.lineTo(x + width, y + height - ry)
        ctx.bezierCurveTo(
          x + width,
          y + height - ry + (KAPPA * ry),
          x + width - rx + (KAPPA * rx),
          y + height,
          x + width - rx,
          y + height
        )
        ctx.lineTo(x + rx, y + height)
        ctx.bezierCurveTo(x + rx - (KAPPA * rx), y + height, x, y + height - ry + (KAPPA * ry), x, y + height - ry)
        ctx.lineTo(x, y + ry)
        ctx.bezierCurveTo(x, y + ry - (KAPPA * ry), x + rx - (KAPPA * rx), y, x + rx, y)
        ctx.closePath()
      }
    }

    return new BoundingBox(x, y, x + width, y + height)
  }

  override getMarkers() {
    return null
  }
}
