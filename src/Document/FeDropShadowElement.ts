import { RenderingContext2D } from '../types'
import { Document } from './Document'
import { Element } from './Element'

export class FeDropShadowElement extends Element {
  override type = 'feDropShadow'

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.addStylesFromStyleDefinition()
  }

  apply(
    _: RenderingContext2D,
    _x: number,
    _y: number,
    _width: number,
    _height: number
  ) {
    // TODO: implement
  }
}
