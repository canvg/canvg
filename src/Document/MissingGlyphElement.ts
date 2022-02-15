import { GlyphElement } from './GlyphElement'

export class MissingGlyphElement extends GlyphElement {
  override type = 'missing-glyph'
  override readonly horizAdvX = 0
}
