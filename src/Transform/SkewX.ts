import { Document } from '../Document'
import { Property } from '../Property'
import { Skew } from './Skew'

export class SkewX extends Skew {
  override type = 'skewX'

  constructor(
    document: Document,
    skew: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    super(document, skew, transformOrigin)

    this.matrix = [
      1,
      0,
      Math.tan(this.angle.getRadians()),
      1,
      0,
      0
    ]
  }
}
