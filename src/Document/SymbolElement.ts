import { RenderingContext2D } from '../types'
import { RenderedElement } from './RenderedElement'

export class SymbolElement extends RenderedElement {
  override type = 'symbol'

  override render(_: RenderingContext2D) {
    // NO RENDER
  }
}
