import { RenderingContext2D } from '../types'
import { Point } from '../Point'
import { BoundingBox } from '../BoundingBox'
import { PathElement, Marker } from './PathElement'

export class LineElement extends PathElement {
  override type = 'line'

  getPoints() {
    return [
      new Point(
        this.getAttribute('x1').getPixels('x'),
        this.getAttribute('y1').getPixels('y')
      ),
      new Point(
        this.getAttribute('x2').getPixels('x'),
        this.getAttribute('y2').getPixels('y')
      )
    ]
  }

  override path(ctx: RenderingContext2D) {
    const [
      {
        x: x0,
        y: y0
      },
      {
        x: x1,
        y: y1
      }
    ] = this.getPoints()

    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
    }

    return new BoundingBox(
      x0,
      y0,
      x1,
      y1
    )
  }

  override getMarkers(): Marker[] {
    const [p0, p1] = this.getPoints()
    const a = p0.angleTo(p1)

    return [[p0, a], [p1, a]]
  }
}
