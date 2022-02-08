import { RenderingContext2D } from '../types'
import { RenderedElement } from './RenderedElement'

export class SymbolElement extends RenderedElement {
  type = 'symbol'

  render(_: RenderingContext2D) {
    // NO RENDER
  }
}
