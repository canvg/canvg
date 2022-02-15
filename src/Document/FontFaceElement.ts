import { Document } from './Document'
import { Element } from './Element'

export class FontFaceElement extends Element {
  override type = 'font-face'
  readonly ascent: number
  readonly descent: number
  readonly unitsPerEm: number

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.ascent = this.getAttribute('ascent').getNumber()
    this.descent = this.getAttribute('descent').getNumber()
    this.unitsPerEm = this.getAttribute('units-per-em').getNumber()
  }
}
