import { RenderingContext2D } from '../types'
import { PSEUDO_ZERO } from '../util'
import { Document } from '../Document'
import { Point } from '../Point'
import { Property } from '../Property'

export class Scale {
  type = 'scale'
  private readonly scale: Point
  private readonly originX: Property
  private readonly originY: Property

  constructor(
    _: Document,
    scale: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    const scaleSize = Point.parseScale(scale)

    // Workaround for node-canvas
    if (scaleSize.x === 0
      || scaleSize.y === 0
    ) {
      scaleSize.x = PSEUDO_ZERO
      scaleSize.y = PSEUDO_ZERO
    }

    this.scale = scaleSize
    this.originX = transformOrigin[0]
    this.originY = transformOrigin[1]
  }

  apply(ctx: RenderingContext2D) {
    const {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this
    const tx = originX.getPixels('x')
    const ty = originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.scale(x, y || x)
    ctx.translate(-tx, -ty)
  }

  unapply(ctx: RenderingContext2D) {
    const {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this
    const tx = originX.getPixels('x')
    const ty = originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.scale(1.0 / x, 1.0 / y || x)
    ctx.translate(-tx, -ty)
  }

  applyToPoint(point: Point) {
    const {
      x,
      y
    } = this.scale

    point.applyTransform([
      x || 0.0,
      0,
      0,
      y || 0.0,
      0,
      0
    ])
  }
}
