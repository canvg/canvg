import { Document } from '../Document'
import { Property } from '../Property'
import { Matrix } from './Matrix'

export class Skew extends Matrix {
  override type = 'skew'
  protected readonly angle: Property

  constructor(
    document: Document,
    skew: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    super(document, skew, transformOrigin)

    this.angle = new Property(document, 'angle', skew)
  }
}
