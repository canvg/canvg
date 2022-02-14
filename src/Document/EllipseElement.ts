import { RenderingContext2D } from '../types'
import { BoundingBox } from '../BoundingBox'
import { PathElement } from './PathElement'

export class EllipseElement extends PathElement {
  override type = 'ellipse'

  override path(ctx: RenderingContext2D) {
    const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3)
    const rx = this.getAttribute('rx').getPixels('x')
    const ry = this.getAttribute('ry').getPixels('y')
    const cx = this.getAttribute('cx').getPixels('x')
    const cy = this.getAttribute('cy').getPixels('y')

    if (ctx && rx > 0 && ry > 0) {
      ctx.beginPath()
      ctx.moveTo(cx + rx, cy)
      ctx.bezierCurveTo(
        cx + rx,
        cy + (KAPPA * ry),
        cx + (KAPPA * rx),
        cy + ry,
        cx,
        cy + ry
      )
      ctx.bezierCurveTo(
        cx - (KAPPA * rx),
        cy + ry,
        cx - rx,
        cy + (KAPPA * ry),
        cx - rx,
        cy
      )
      ctx.bezierCurveTo(
        cx - rx,
        cy - (KAPPA * ry),
        cx - (KAPPA * rx),
        cy - ry,
        cx,
        cy - ry
      )
      ctx.bezierCurveTo(
        cx + (KAPPA * rx),
        cy - ry,
        cx + rx,
        cy - (KAPPA * ry),
        cx + rx,
        cy
      )
      ctx.closePath()
    }

    return new BoundingBox(
      cx - rx,
      cy - ry,
      cx + rx,
      cy + ry
    )
  }

  override getMarkers() {
    return null
  }
}
