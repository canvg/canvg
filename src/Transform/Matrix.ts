import { MatrixValue, RenderingContext2D } from '../types'
import { toMatrixValue } from '../util'
import { Document } from '../Document'
import { Point } from '../Point'
import { Property } from '../Property'
import { ITransform } from './types'

export class Matrix implements ITransform {
  type = 'matrix'
  protected matrix: MatrixValue
  private readonly originX: Property
  private readonly originY: Property

  constructor(
    _: Document,
    matrix: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    this.matrix = toMatrixValue(matrix)
    this.originX = transformOrigin[0]
    this.originY = transformOrigin[1]
  }

  apply(ctx: RenderingContext2D) {
    const {
      originX,
      originY,
      matrix
    } = this
    const tx = originX.getPixels('x')
    const ty = originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.transform(
      matrix[0],
      matrix[1],
      matrix[2],
      matrix[3],
      matrix[4],
      matrix[5]
    )
    ctx.translate(-tx, -ty)
  }

  unapply(ctx: RenderingContext2D) {
    const {
      originX,
      originY,
      matrix
    } = this
    const a = matrix[0]
    const b = matrix[2]
    const c = matrix[4]
    const d = matrix[1]
    const e = matrix[3]
    const f = matrix[5]
    const g = 0.0
    const h = 0.0
    const i = 1.0
    const det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g))
    const tx = originX.getPixels('x')
    const ty = originY.getPixels('y')

    ctx.translate(tx, ty)
    ctx.transform(
      det * (e * i - f * h),
      det * (f * g - d * i),
      det * (c * h - b * i),
      det * (a * i - c * g),
      det * (b * f - c * e),
      det * (c * d - a * f)
    )
    ctx.translate(-tx, -ty)
  }

  applyToPoint(point: Point) {
    point.applyTransform(this.matrix)
  }
}
