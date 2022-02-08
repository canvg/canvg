import { PathElement } from './PathElement'

export class MissingGlyphElement extends PathElement {
  type = 'missing-glyph'
  readonly horizAdvX = 0
}
