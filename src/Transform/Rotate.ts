import { RenderingContext2D } from '../types'
import { toNumbers } from '../util'
import { Document } from '../Document'
import { Property } from '../Property'
import { Point } from '../Point'

export class Rotate {
  type = 'rotate'
  private readonly angle: Property
  private readonly originX: Property
  private readonly originY: Property
  private readonly cx: number
  private readonly cy: number

  constructor(
    document: Document,
    rotate: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    const numbers = toNumbers(rotate)

    this.angle = new Property(document, 'angle', numbers[0])
    this.originX = transformOrigin[0]
    this.originY = transformOrigin[1]
    this.cx = numbers[1] || 0
    this.cy = numbers[2] || 0
  }

  apply(ctx: RenderingContext2D) {
    const {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this
    const tx = cx + originX.getPixels('x')
    const ty = cy + originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.rotate(angle.getRadians())
    ctx.translate(-tx, -ty)
  }

  unapply(ctx: RenderingContext2D) {
    const {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this
    const tx = cx + originX.getPixels('x')
    const ty = cy + originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.rotate(-1.0 * angle.getRadians())
    ctx.translate(-tx, -ty)
  }

  applyToPoint(point: Point) {
    const {
      cx,
      cy,
      angle
    } = this
    const rad = angle.getRadians()

    point.applyTransform([
      1,
      0,
      0,
      1,
      cx || 0.0, // this.p.x
      cy || 0.0 // this.p.y
    ])
    point.applyTransform([
      Math.cos(rad),
      Math.sin(rad),
      -Math.sin(rad),
      Math.cos(rad),
      0,
      0
    ])
    point.applyTransform([
      1,
      0,
      0,
      1,
      -cx || 0.0, // -this.p.x
      -cy || 0.0 // -this.p.y
    ])
  }
}
