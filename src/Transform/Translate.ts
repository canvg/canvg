import { RenderingContext2D } from '../types'
import { Document } from '../Document'
import { Point } from '../Point'

export class Translate {
  type = 'translate'
  private readonly point: Point

  constructor(
    _: Document,
    point: string
  ) {
    this.point = Point.parse(point)
  }

  apply(ctx: RenderingContext2D) {
    const {
      x,
      y
    } = this.point

    ctx.translate(
      x || 0.0,
      y || 0.0
    )
  }

  unapply(ctx: RenderingContext2D) {
    const {
      x,
      y
    } = this.point

    ctx.translate(
      -1.0 * x || 0.0,
      -1.0 * y || 0.0
    )
  }

  applyToPoint(point: Point) {
    const {
      x,
      y
    } = this.point

    point.applyTransform([
      1,
      0,
      0,
      1,
      x || 0.0,
      y || 0.0
    ])
  }
}
