import { Document } from './Document'
import { Element } from './Element'
import { FontFaceElement } from './FontFaceElement'
import { MissingGlyphElement } from './MissingGlyphElement'
import { ArabicForm, GlyphElement } from './GlyphElement'

export class FontElement extends Element {
  override type = 'font'
  readonly isArabic: boolean = false
  readonly missingGlyph: MissingGlyphElement | undefined
  readonly glyphs: Map<string, GlyphElement> = new Map()
  readonly arabicGlyphs: Map<string, Map<ArabicForm, GlyphElement>> = new Map()
  readonly horizAdvX: number
  readonly isRTL: boolean = false
  readonly fontFace: FontFaceElement | undefined

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber()

    const { definitions } = document
    const { children } = this

    for (const child of children) {
      if (child instanceof FontFaceElement) {
        this.fontFace = child

        const fontFamilyStyle = child.getStyle('font-family')

        if (fontFamilyStyle.hasValue()) {
          definitions.set(fontFamilyStyle.getString(), this)
        }
      } else
      if (child instanceof MissingGlyphElement) {
        this.missingGlyph = child
      } else
      if (child instanceof GlyphElement) {
        if (child.arabicForm) {
          this.isRTL = true
          this.isArabic = true

          let arabicGlyph = this.arabicGlyphs.get(child.unicode)

          if (typeof arabicGlyph === 'undefined') {
            arabicGlyph = new Map()
            this.arabicGlyphs.set(child.unicode, arabicGlyph)
          }

          arabicGlyph.set(child.arabicForm, child)
        } else {
          this.glyphs.set(child.unicode, child)
        }
      }
    }
  }

  override render() {
    // NO RENDER
  }
}
