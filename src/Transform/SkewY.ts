import { Document } from '../Document'
import { Property } from '../Property'
import { Skew } from './Skew'

export class SkewY extends Skew {
  override type = 'skewY'

  constructor(
    document: Document,
    skew: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    super(document, skew, transformOrigin)

    this.matrix = [
      1,
      Math.tan(this.angle.getRadians()),
      0,
      1,
      0,
      0
    ]
  }
}
